const assert = require("node:assert/strict");
const {EventEmitter} = require("node:events");
const fs = require("node:fs");
const https = require("node:https");
const os = require("node:os");
const path = require("node:path");
const {spawnSync} = require("node:child_process");
const {test} = require("node:test");
const {refreshData, requestJSON} = require("../fetch");
const {
  validateSnapshots,
  writeSnapshot,
  validateProfile
} = require("./snapshots");

const profile = () => ({
  data: {
    user: {
      name: "Portfolio owner",
      bio: null,
      avatarUrl: "https://example.com/avatar.png",
      location: null,
      pinnedItems: {
        totalCount: 1,
        edges: [
          {
            node: {
              id: "repository-id",
              name: "Example project",
              description: null,
              forkCount: 0,
              stargazerCount: 0,
              url: "https://github.com/example/project",
              diskUsage: 100,
              primaryLanguage: null
            }
          }
        ]
      }
    }
  }
});

const blogs = () => ({
  items: [
    {
      title: "Example post",
      link: "https://medium.com/@example/post",
      content: "<p>Example content</p>"
    }
  ]
});

const env = {
  GITHUB_TOKEN: "test-token",
  GITHUB_USERNAME: "example",
  USE_GITHUB_DATA: "true",
  MEDIUM_USERNAME: "example"
};

function setup(t) {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-snapshots-")
  );
  t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
  const original = {
    "profile.json": JSON.stringify(profile()),
    "blogs.json": JSON.stringify(blogs())
  };
  for (const [filename, text] of Object.entries(original)) {
    fs.writeFileSync(path.join(directory, filename), text);
  }
  return {directory, original};
}

function assertUnchanged(directory, original) {
  for (const [filename, text] of Object.entries(original)) {
    assert.equal(fs.readFileSync(path.join(directory, filename), "utf8"), text);
  }
  assert.deepEqual(fs.readdirSync(directory).sort(), [
    "blogs.json",
    "profile.json"
  ]);
}

test("refreshes configured sources and saves only site fields", async t => {
  const {directory} = setup(t);
  const messages = [];
  const requests = [];
  const updated = profile();
  updated.data.user.name = "Updated owner";
  updated.extensions = {privateMetadata: "must not be saved"};
  const getJSON = async (options, body) => {
    requests.push(options.hostname);
    if (options.hostname === "api.github.com") {
      assert.equal(options.headers.Authorization, "Bearer test-token");
      assert.equal(JSON.parse(body).variables.login, "example");
      return updated;
    }
    return {status: "ok", feed: {privateMetadata: "omit"}, ...blogs()};
  };
  await refreshData({
    env,
    directory,
    getJSON,
    log: line => messages.push(line)
  });

  validateSnapshots(directory);
  const savedProfile = fs.readFileSync(
    path.join(directory, "profile.json"),
    "utf8"
  );
  assert.equal(JSON.parse(savedProfile).data.user.name, "Updated owner");
  assert.equal(savedProfile.includes("privateMetadata"), false);
  assert.equal(savedProfile.includes(env.GITHUB_TOKEN), false);
  assert.equal(messages.join(" ").includes(env.GITHUB_TOKEN), false);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(directory, "blogs.json"), "utf8")),
    blogs()
  );
  assert.equal(
    savedProfile,
    JSON.stringify(JSON.parse(savedProfile), null, 2) + "\n"
  );
  assert.deepEqual(requests.sort(), ["api.github.com", "api.rss2json.com"]);
});

test("GitHub-only refresh supports existing local token settings", async t => {
  const {directory, original} = setup(t);
  await refreshData({
    env: {...env, GITHUB_TOKEN: "", REACT_APP_GITHUB_TOKEN: "legacy-token"},
    args: ["--github"],
    directory,
    getJSON: async options => {
      assert.equal(options.hostname, "api.github.com");
      assert.equal(options.headers.Authorization, "Bearer legacy-token");
      return profile();
    },
    log: () => {}
  });
  assert.equal(
    fs.readFileSync(path.join(directory, "blogs.json"), "utf8"),
    original["blogs.json"]
  );
});

test("Medium-only refresh works without GitHub credentials and accepts no posts", async t => {
  const {directory, original} = setup(t);
  await refreshData({
    env: {MEDIUM_USERNAME: "example"},
    args: ["--medium"],
    directory,
    getJSON: async options => {
      assert.equal(options.hostname, "api.rss2json.com");
      return {status: "ok", items: []};
    },
    log: () => {}
  });
  assert.equal(
    fs.readFileSync(path.join(directory, "profile.json"), "utf8"),
    original["profile.json"]
  );
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(directory, "blogs.json"), "utf8")),
    {items: []}
  );
});

const failures = [
  [
    "GraphQL errors with otherwise valid data",
    value => ({
      ...value,
      errors: [{message: "Resource not accessible by integration"}]
    })
  ],
  ["missing profile", () => ({data: {user: null}})],
  [
    "inaccessible pinned repository",
    value => {
      value.data.user.pinnedItems.edges[0].node = null;
      return value;
    }
  ],
  [
    "incomplete repository",
    value => {
      delete value.data.user.pinnedItems.edges[0].node.primaryLanguage;
      return value;
    }
  ],
  [
    "invalid star count",
    value => {
      value.data.user.pinnedItems.edges[0].node.stargazerCount = -1;
      return value;
    }
  ]
];

for (const [label, response] of failures) {
  test(`preserves both snapshots on ${label}`, async t => {
    const {directory, original} = setup(t);
    await assert.rejects(
      refreshData({
        env,
        directory,
        getJSON: async options =>
          options.hostname === "api.github.com" ? response(profile()) : blogs(),
        log: () => {}
      })
    );
    assertUnchanged(directory, original);
  });
}

for (const [label, response] of [
  ["API error", {status: "error", items: []}],
  ["missing items", {}],
  ["incomplete post", {items: [{title: "Incomplete"}]}]
]) {
  test(`preserves both snapshots on Medium ${label}`, async t => {
    const {directory, original} = setup(t);
    await assert.rejects(
      refreshData({
        env,
        directory,
        getJSON: async options =>
          options.hostname === "api.github.com" ? profile() : response,
        log: () => {}
      })
    );
    assertUnchanged(directory, original);
  });
}

test("preserves both snapshots on a network failure", async t => {
  const {directory, original} = setup(t);
  await assert.rejects(
    refreshData({
      env,
      directory,
      getJSON: async () => {
        throw new Error("Network unavailable");
      }
    }),
    /Network unavailable/
  );
  assertUnchanged(directory, original);
});

test("validates hand-edited legacy counts and nullable fields", () => {
  const value = profile();
  const repo = value.data.user.pinnedItems.edges[0].node;
  delete repo.stargazerCount;
  repo.stargazers = {totalCount: 0};
  assert.doesNotThrow(() => validateProfile(value));
});

test("validation rejects missing or malformed local files", t => {
  const {directory} = setup(t);
  const filename = path.join(directory, "profile.json");
  fs.writeFileSync(filename, "{");
  assert.throws(() => validateSnapshots(directory), /profile.json/);
  fs.rmSync(filename);
  assert.throws(() => validateSnapshots(directory), /profile.json/);
});

test("invalid manual writes preserve the previous snapshot", t => {
  const {directory, original} = setup(t);
  assert.throws(() => writeSnapshot(path.join(directory, "profile.json"), {}));
  assertUnchanged(directory, original);
});

test("CLI exits unsuccessfully for invalid flags", () => {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, "..", "fetch.js"), "--invalid"],
    {
      encoding: "utf8"
    }
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

for (const [label, status, response] of [
  ["HTTP errors", 403, "Forbidden"],
  ["malformed JSON", 200, "<html>Unavailable</html>"]
]) {
  test(`requestJSON rejects ${label}`, async t => {
    t.mock.method(https, "request", (options, callback) => {
      const request = new EventEmitter();
      request.setTimeout = () => {};
      request.end = () => {
        const res = new EventEmitter();
        res.statusCode = status;
        res.resume = () => {};
        res.setEncoding = () => {};
        callback(res);
        res.emit("data", response);
        res.emit("end");
      };
      return request;
    });
    await assert.rejects(requestJSON({hostname: "example.com"}));
  });
}
