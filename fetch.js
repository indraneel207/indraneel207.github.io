const https = require("https");
const path = require("path");
const {
  PUBLIC_DIR,
  validateProfile,
  validateBlogs,
  writeSnapshot
} = require("./scripts/snapshots");

function requestJSON(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(
          new Error(`${options.hostname} returned HTTP ${res.statusCode}.`)
        );
        return;
      }
      let data = "";
      res.setEncoding("utf8");
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("error", reject);
      res.on("aborted", () =>
        reject(new Error("API response was interrupted."))
      );
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`${options.hostname} returned invalid JSON.`));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error(`${options.hostname} request timed out.`));
    });
    req.end(body);
  });
}

async function fetchProfile(env, getJSON) {
  // Accept the template's old variable name for existing local .env files.
  const token = env.GITHUB_TOKEN || env.REACT_APP_GITHUB_TOKEN;
  if (!token || !env.GITHUB_USERNAME) {
    throw new Error("Set GITHUB_TOKEN and GITHUB_USERNAME in your local .env.");
  }
  const profile = await getJSON(
    {
      hostname: "api.github.com",
      path: "/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Node",
        "Content-Type": "application/json"
      }
    },
    JSON.stringify({
      query: `query PortfolioProfile($login: String!) {
        user(login: $login) {
          id
          name
          bio
          avatarUrl
          location
          pinnedItems(first: 6, types: [REPOSITORY]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  id
                  name
                  description
                  forkCount
                  stargazerCount
                  url
                  diskUsage
                  primaryLanguage { name color }
                }
              }
            }
          }
        }
      }`,
      variables: {login: env.GITHUB_USERNAME}
    })
  );
  validateProfile(profile);
  const user = profile.data.user;
  // Store only fields used by the site, omitting API metadata and errors.
  return {
    data: {
      user: {
        ...(user.id ? {id: user.id} : {}),
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        location: user.location,
        pinnedItems: {
          totalCount: user.pinnedItems.totalCount,
          edges: user.pinnedItems.edges.map(({node}) => ({
            node: {
              id: node.id,
              name: node.name,
              description: node.description,
              forkCount: node.forkCount,
              stargazerCount: node.stargazerCount ?? node.stargazers.totalCount,
              url: node.url,
              diskUsage: node.diskUsage,
              primaryLanguage: node.primaryLanguage
                ? {
                    name: node.primaryLanguage.name,
                    color: node.primaryLanguage.color
                  }
                : null
            }
          }))
        }
      }
    }
  };
}

async function fetchBlogs(env, getJSON) {
  if (!env.MEDIUM_USERNAME) {
    throw new Error("Set MEDIUM_USERNAME in your local .env.");
  }
  const feed = `https://medium.com/feed/@${env.MEDIUM_USERNAME}`;
  const blogs = await getJSON({
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=${encodeURIComponent(feed)}`,
    method: "GET"
  });
  validateBlogs(blogs);
  return {
    items: blogs.items.map(({title, link, content}) => ({title, link, content}))
  };
}

async function refreshData({
  env = process.env,
  args = [],
  directory = PUBLIC_DIR,
  getJSON = requestJSON,
  log = console.log
} = {}) {
  if (args.some(arg => !["--github", "--medium"].includes(arg))) {
    throw new Error("Usage: npm run refresh:data -- [--github] [--medium]");
  }
  const sources = [];
  const github = args.length
    ? args.includes("--github")
    : env.USE_GITHUB_DATA === "true";
  const medium = args.length
    ? args.includes("--medium")
    : Boolean(env.MEDIUM_USERNAME);
  if (github) sources.push(["profile.json", fetchProfile]);
  if (medium) sources.push(["blogs.json", fetchBlogs]);
  if (sources.length === 0) {
    throw new Error(
      "No sources configured. Set USE_GITHUB_DATA=true or MEDIUM_USERNAME, or select --github or --medium."
    );
  }

  // Fetch and validate every selected source before changing either snapshot.
  const snapshots = await Promise.all(
    sources.map(async ([filename, fetchData]) => [
      filename,
      await fetchData(env, getJSON)
    ])
  );
  for (const [filename, data] of snapshots) {
    writeSnapshot(path.join(directory, filename), data);
    log(`Updated public/${filename}`);
  }
  log(
    "Review the JSON diff, then commit and push the snapshots to publish them."
  );
}

if (require.main === module) {
  require("dotenv").config({path: path.join(__dirname, ".env")});
  refreshData({args: process.argv.slice(2)}).catch(error => {
    console.error(`Data refresh failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {refreshData, requestJSON};
