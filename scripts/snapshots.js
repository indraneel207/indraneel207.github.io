const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

const isText = value => typeof value === "string" && value.length > 0;
const isNullableText = value => value === null || typeof value === "string";
const isCount = value => Number.isInteger(value) && value >= 0;

function validateProfile(profile) {
  requireValue(
    profile &&
      (profile.errors === undefined ||
        (Array.isArray(profile.errors) && profile.errors.length === 0)),
    "Profile contains GitHub API errors."
  );
  const user = profile.data && profile.data.user;
  requireValue(
    user && isText(user.avatarUrl),
    "Profile needs a user avatarUrl."
  );
  for (const field of ["name", "bio", "location"]) {
    requireValue(
      isNullableText(user[field]),
      `Profile needs a valid ${field}.`
    );
  }
  const pinned = user.pinnedItems;
  requireValue(
    pinned &&
      Array.isArray(pinned.edges) &&
      isCount(pinned.totalCount) &&
      pinned.totalCount >= pinned.edges.length,
    "Profile needs valid pinnedItems with edges and totalCount."
  );
  pinned.edges.forEach((edge, index) => {
    const repo = edge && edge.node;
    const label = `Pinned repository ${index + 1}`;
    requireValue(
      repo && ["id", "name", "url"].every(field => isText(repo[field])),
      `${label} needs an id, name, and url.`
    );
    requireValue(
      isNullableText(repo.description) &&
        isCount(repo.forkCount) &&
        isCount(repo.diskUsage) &&
        isCount(
          repo.stargazerCount ?? (repo.stargazers && repo.stargazers.totalCount)
        ),
      `${label} needs a description and nonnegative fork, star, and size counts.`
    );
    requireValue(
      repo.primaryLanguage === null ||
        (repo.primaryLanguage &&
          isText(repo.primaryLanguage.name) &&
          isNullableText(repo.primaryLanguage.color)),
      `${label} needs a primaryLanguage object or null.`
    );
  });
}

function validateBlogs(blogs) {
  requireValue(
    blogs &&
      (blogs.status === undefined || blogs.status === "ok") &&
      Array.isArray(blogs.items),
    "Blogs needs an items array and must not contain an API error status."
  );
  blogs.items.forEach((blog, index) => {
    requireValue(
      blog &&
        isText(blog.title) &&
        isText(blog.link) &&
        typeof blog.content === "string",
      `Blog ${index + 1} needs a title, link, and content.`
    );
  });
}

const validators = {
  "profile.json": validateProfile,
  "blogs.json": validateBlogs
};

function validateSnapshots(directory = PUBLIC_DIR) {
  for (const [filename, validate] of Object.entries(validators)) {
    try {
      validate(
        JSON.parse(fs.readFileSync(path.join(directory, filename), "utf8"))
      );
    } catch (error) {
      throw new Error(`${filename}: ${error.message}`);
    }
  }
}

function writeSnapshot(filename, data) {
  const validate = validators[path.basename(filename)];
  requireValue(validate, "Unknown snapshot filename.");
  validate(data);
  const temporary = `${filename}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(data, null, 2) + "\n");
    fs.renameSync(temporary, filename);
  } finally {
    fs.rmSync(temporary, {force: true});
  }
}

if (require.main === module) {
  try {
    validateSnapshots();
    console.log("Committed profile and blog snapshots are valid.");
  } catch (error) {
    console.error(`Snapshot validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  PUBLIC_DIR,
  validateProfile,
  validateBlogs,
  validateSnapshots,
  writeSnapshot
};
