# Indraneel Vairagare — Portfolio

A project-led portfolio built with Astro, TypeScript, and a small React project explorer. Static HTML makes the work, experience, and contact information available immediately, including without JavaScript.

## Develop

Use Node 24 and the npm version bundled with it. The version is recorded in `.nvmrc`.

```sh
nvm install
nvm use
npm ci
npm start
```

`nvm install` installs the Node 24 version selected by `.nvmrc` if needed. Run
`nvm use` when opening a new terminal in this project; an existing terminal may
still be using Node 21. Confirm the active version with `node --version`.

The development server runs at `http://127.0.0.1:4321`. To inspect the production output:

```sh
npm run build
npm run preview
```

Astro writes the static site to `dist/`.

## Edit content

- `src/data/profile.ts`: biography, contact links, resume URL, experience, capabilities, experiments, credentials, and recommendations.
- `src/content/work/*.md`: case-study metadata and narrative. The schema in `src/content.config.ts` validates required fields.
- `src/pages/index.astro`: homepage composition.
- `src/pages/work/[id].astro`: shared case-study layout and static routes.
- `src/styles/global.css`: colors, type, spacing, responsive layouts, and reduced-motion behavior.
- `src/components/ProjectExplorer.tsx`: the interactive example interface, search, architecture view, and engineering notes.
- `src/assets/images/`: original project screenshots, optimized by Astro at build time.
- `public/social-preview.svg` and `.png`: source artwork and raster image for link previews.

Featured work is published at `/work/datahub/`, `/work/rabitpy/`, and `/work/onboarding/`. Supporting case studies are at `/work/insuregpt/` and `/work/research-lab/`. Each entry's `featured` flag controls its homepage placement, and `resources` adds paper, source, and package links to its case study. The employer dashboard, research trajectories, and prototype flow are clearly labeled illustrations. Case studies are based on the original portfolio, owner-provided experience updates, and the sources linked within each article. Vanguard's impact figures reflect the supplied role summary: 10+ hours saved weekly, engineering examples adopted across 6 teams, and 40% faster AI-assisted workflows. InsureGPT is presented as a prototype without an unverified performance score.

RABiTPy's contribution and publication details are supported by its [journal article](https://link.springer.com/article/10.1186/s12859-025-06145-w); the [package documentation](https://pypi.org/project/RABiTPy/) describes its workflow. About-section achievements and community roles come from the public LinkedIn profile. The three recommendations use the full text, dates, and working relationships supplied by Indraneel, with linked author profiles and verbatim excerpts. The initial design roadmap is in [docs/portfolio-revamp-plan.md](docs/portfolio-revamp-plan.md), with the later content comparison in [docs/linkedin-content-audit.md](docs/linkedin-content-audit.md).

## Saved GitHub and blog data

The repository retains the existing local refresh and validation workflow:

- `public/profile.json`: saved GitHub profile and pinned repository metadata.
- `public/blogs.json`: saved Medium posts; an empty `items` array is valid.
- `fetch.js`: refreshes selected sources locally.
- `scripts/snapshots.js`: validates and atomically writes snapshots.

Portfolio copy, project categories, and contact information are curated in the content files; visitors do not need a GitHub API request. The saved snapshots and local refresh tools remain available, and the build validates the snapshots to catch accidental malformed edits.

To refresh data, copy `env.example` to `.env`, configure the desired sources locally, and run:

```sh
npm run refresh:data
# Or select one source:
npm run refresh:data -- --github
npm run refresh:data -- --medium
```

`USE_GITHUB_DATA="true"` selects GitHub for an unflagged refresh. `MEDIUM_USERNAME` selects Medium. Set `GITHUB_USERNAME` and `GITHUB_TOKEN` for GitHub. The legacy local `REACT_APP_GITHUB_TOKEN` name remains supported by the refresh script. These credentials are only for the local refresh script; the browser does not use them. `.env` remains ignored.

Review and commit the resulting snapshots to publish updated metadata. Failed responses leave the previous snapshots intact. Deployment does not refresh external data or require these tokens.

## Verify

```sh
npm run check
npm run build
npm test
npm run check-format
npm run test:browser
```

`npm test` runs data-refresh regression tests and verifies the built HTML, internal links, anchors, metadata, and static project routes. Run `npm run build` before it.

Browser tests use installed Google Chrome locally. In CI they use Playwright Chromium:

```sh
npx playwright install --with-deps chromium
CI=true npm run test:browser
```

The browser suite checks responsive overflow from 320px to 1440px, search and keyboard-operated tabs, mobile navigation, persistent themes, unavailable local storage, no-JavaScript navigation, and automated WCAG AA checks in both themes. Automated checks supplement manual accessibility review.

The accessibility checks also explicitly enable Lighthouse's label-in-name rule. For Lighthouse comparisons, use a clean Chrome profile with extensions disabled and consistent device/throttling settings. Findings and corrections from the supplied production report are recorded in [docs/lighthouse-review.md](docs/lighthouse-review.md).

## Deploy

The existing GitHub Pages workflow remains the publishing path:

1. Push a reviewed change to `main`, or run **Build and Deploy** manually.
2. GitHub Actions installs dependencies, checks types, validates data, builds the static site, and runs regression tests.
3. The deployment action publishes `dist/` to `gh-pages` using the automatic `GITHUB_TOKEN`.

GitHub Pages should serve the root of the `gh-pages` branch. Pull requests to `main` run format checks and a separate build/browser validation workflow. This migration does not change repository hosting settings.

Keep `public/.nojekyll`: Astro copies this empty marker to `dist/.nojekyll`, which the deployment action publishes at the root of `gh-pages`. It disables Jekyll processing so GitHub Pages serves Astro's `_astro/` directory, including stylesheets, fonts, scripts, and optimized images. The generated-site tests require this marker before deployment. See [GitHub's static-site publishing guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

The existing Google Analytics measurement ID is preserved. Project opens, resume clicks, and email clicks have named events. Theme preference is stored locally; the email-copy action provides an accessible status message and retains a normal mail link.

### Custom domain: indraneel.dev

The production URL is `https://indraneel.dev`. `astro.config.mjs` controls canonical URLs, social-preview URLs, the sitemap, and the hostname allowed to load analytics. `public/robots.txt` points to the production sitemap. `public/CNAME` is copied into `dist/` and published to `gh-pages`, preserving the custom domain across deployments.

Complete the account configuration in this order:

1. In [GitHub profile Settings → Pages](https://github.com/settings/pages), add `indraneel.dev` as a verified domain. In Spaceship's Advanced DNS, add the exact TXT host and value GitHub displays, then return to GitHub and verify it. Keep this TXT record. See [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
2. In this repository's **Settings → Pages**, set **Custom domain** to `indraneel.dev` and save. The publishing source remains **Deploy from a branch → gh-pages → /(root)**.
3. In Spaceship, open **Advanced DNS**, select `indraneel.dev`, and replace the default parking/website records for `@` and `www` with the records below. Retain unrelated TXT and email records. Use the default TTL. These records assume the domain uses Spaceship's nameservers.

| Type  | Host  | Value                    |
| ----- | ----- | ------------------------ |
| A     | `@`   | `185.199.108.153`        |
| A     | `@`   | `185.199.109.153`        |
| A     | `@`   | `185.199.110.153`        |
| A     | `@`   | `185.199.111.153`        |
| CNAME | `www` | `indraneel207.github.io` |

4. Deploy this source change through the existing **Build and Deploy** workflow so `gh-pages/CNAME` and the generated metadata are updated together. Check that the build still includes `.nojekyll`.
5. Wait for the DNS check and certificate provisioning in GitHub Pages, then select **Enforce HTTPS**. DNS propagation and availability of this option can take up to 24 hours. GitHub obtains the certificate automatically; a separate paid SSL certificate is unnecessary. See [GitHub's custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [HTTPS provisioning](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
6. Check `https://indraneel.dev/`, a direct case-study URL, and `https://www.indraneel.dev/`. With both hostnames configured, GitHub Pages redirects `www` to the configured apex domain. Update the Google Analytics web stream's website URL to `https://indraneel.dev` and confirm events in Realtime; retain the existing measurement ID.

Local commands for checking DNS after configuration:

```sh
dig +short indraneel.dev A
dig +short www.indraneel.dev CNAME
dig +short _github-pages-challenge-indraneel207.indraneel.dev TXT
```

## Docker

```sh
docker build -t indraneel-portfolio .
docker run --rm -p 4321:4321 indraneel-portfolio
```

The container serves the built site with Astro's preview server for local review. `.dockerignore` excludes local credentials and generated output.

## Attribution

The original portfolio was based on [developerFolio](https://github.com/saadpasta/developerFolio). The presentation has been rebuilt in Astro. The repository's license and the two project screenshots used in case studies are retained; unused template assets and contributor-bot configuration have been removed. See [LICENSE](LICENSE).
