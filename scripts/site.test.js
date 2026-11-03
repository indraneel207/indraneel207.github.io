const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {test} = require("node:test");

const output = path.join(__dirname, "..", "dist");
const pages = [
  "index.html",
  "work/datahub/index.html",
  "work/rabitpy/index.html",
  "work/onboarding/index.html",
  "work/insuregpt/index.html",
  "work/research-lab/index.html",
  "404.html"
];

test("all portfolio routes contain meaningful pre-rendered content and metadata", () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(output, page), "utf8");
    assert.match(html, /<html[^>]*lang="en"/);
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      `${page}: one primary heading`
    );
    assert.match(html, /<main[^>]*id="main"/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(
      html,
      /rel="canonical" href="https:\/\/indraneel207.github.io/
    );
    if (page.startsWith("work/")) {
      assert.match(html, /The challenge/);
      assert.match(html, /What I owned/);
      assert.match(html, /The result/);
    }
  }
});

test("generated local links, section anchors, and images resolve", () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(output, page), "utf8");
    const currentRoute =
      page === "index.html" ? "/" : "/" + page.replace(/index\.html$/, "");
    for (const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      const raw = match[1];
      if (!raw.startsWith("/") && !raw.startsWith("#")) continue;
      const url = new URL(
        raw.replace(/&amp;/g, "&"),
        "https://portfolio.test" + currentRoute
      );
      const relative = decodeURIComponent(url.pathname).replace(/^\//, "");
      const target = path.join(
        output,
        relative.endsWith("/") || !relative ? relative + "index.html" : relative
      );
      assert.ok(fs.existsSync(target), `${page}: missing target ${raw}`);
      if (url.hash && target.endsWith(".html")) {
        const targetHtml = fs.readFileSync(target, "utf8");
        assert.ok(
          targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${page}: missing anchor ${raw}`
        );
      }
    }
  }
});

test("social preview and sitemap are included in the static output", () => {
  assert.ok(fs.statSync(path.join(output, "social-preview.png")).size > 0);
  assert.ok(fs.existsSync(path.join(output, "sitemap-index.xml")));
});
