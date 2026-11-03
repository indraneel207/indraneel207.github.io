**Portfolio revamp: Engineering, with craft**

Prepared November 3, 2026. Primary audience: hiring managers and engineering leads, confirmed by Indraneel.

The recommended direction is a project-led portfolio with an editorial workshop aesthetic: confident typography, warm surfaces, large product previews, and small annotations that explain engineering decisions. Visitors should quickly understand what Indraneel builds, see evidence of ownership, and find the resume or contact details. Personality comes through the composition, writing, and interactions.

**1. What the current portfolio communicates**

The strongest material already exists: React and AWS work at Vanguard, progression into engineering leadership at actyv.ai, onboarding and e-signature systems, and the ASU research lab website. These can support a convincing story about making complex workflows usable.

The current presentation spreads that story across skills, education, experience, GitHub repositories, and project cards. The template illustrations, repeated card layouts, and playful copy receive considerable space before a visitor sees a substantial project.

| Priority | Finding and evidence                                                                                                                                                               | Proposed response                                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| High     | `src/portfolio.js` enables a 2,000ms splash screen, and `src/containers/Main.js` withholds the main content until it finishes.                                                     | Render the introduction immediately. Use a small, optional brand animation within the page.                                     |
| High     | `Main.js` places skills and education before experience and both project sections.                                                                                                 | Put selected work immediately after a short introduction and credibility line.                                                  |
| High     | `Header.js` links to `#opensource` but has no link to the professional showcase at `#projects`.                                                                                    | Make **Work** the first navigation item and provide clear links to each featured case study.                                    |
| High     | Five of the six repositories in `public/profile.json` have null descriptions. Cards emphasize repository names, stars, forks, and size.                                            | Curate human-readable titles, short summaries, previews, and a reason each project matters. Keep GitHub metadata supplementary. |
| High     | The existing build has document widths of 421px at a 390px viewport and 416px at a 320px viewport. `WorkExperience.scss` sets a 400px grid-column minimum.                         | Use fluid tracks, shrinkable content, and responsive spacing. Require zero horizontal overflow at launch.                       |
| High     | Repository cards use clickable `div` elements; project actions use clickable `span` elements. Social icons lack accessible names, and the mobile menu relies on a hidden checkbox. | Use native links and buttons, labeled controls, visible focus, and a keyboard-operable menu.                                    |
| Medium   | The hero is a long paragraph; phrases such as “pro mischief,” “kick-ass,” and “magic” appear throughout professional content.                                                      | Write short, specific statements about responsibilities and outcomes. Keep playful touches in captions and personal details.    |
| Medium   | Four actyv.ai roles appear as separate cards with repeated company branding.                                                                                                       | Group them into one company entry with visible progression and selected accomplishments.                                        |
| Medium   | The inspected build's main JavaScript file is about 1.31MB uncompressed / 405KB gzipped. This is an artifact measurement, not a network or Core Web Vitals result.                 | Set a smaller JavaScript budget and render portfolio content as static HTML. Load interactive features selectively.             |
| Medium   | The app uses React 16 and Create React App. Deployment runs from `main`, format checks target `master`, and the package deploy command also targets `master`.                      | Modernize the foundation during implementation and align checks and deployment around the actual publishing workflow.           |

Review basis: source inspection and the existing local production build in headless Chrome at 320, 390, 768, and 1440px widths. The build contains the current hero and Vanguard content, but was not rebuilt for this review. The public URL returned only the JavaScript app shell to the web reader. This is a focused design and code audit, not a complete accessibility, performance, or live-site audit.

**2. Visual direction**

Use the feel of a carefully assembled engineering notebook: orderly enough to communicate trust, with enough hand-touched detail to feel personal.

| Element       | Direction                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Composition   | A generous editorial grid, left-aligned text, and alternating large project compositions. One lead project gets more space than the supporting work.                  |
| Typography    | A self-hosted sans serif such as Manrope for headlines and body text; IBM Plex Mono for small technical labels and figure captions. Use the actual available weights. |
| Light palette | Warm paper `#F6F4EE`, ink `#1D2525`, secondary text `#596565`, rust accent `#A13720`.                                                                                 |
| Dark palette  | Charcoal `#141B1B`, warm white `#F4F2EB`, secondary text `#AFB9B5`, peach accent `#FFA078`. Respect system preference and persist an explicit selection.              |
| Craft details | A restrained handwritten underline, numbered figures, thin diagram connectors, and brief margin notes. Keep small metadata readable.                                  |
| Imagery       | Large, consistent screenshots, cropped interface details, and simple architecture diagrams. Add a real portrait in the about section if desired.                      |
| Surfaces      | Flat panels, fine borders, and restrained shadows. Use color to distinguish project stories.                                                                          |
| Motion        | Short transitions around 150–250ms for controls, with one subtle entrance per major section. All content remains available with reduced motion.                       |

The proposed primary, secondary, and accent text colors each exceed 4.5:1 against their corresponding background in a simple color calculation. Verify complete components, focus indicators, and every interactive state during implementation.

Keep the name recognizable. A clean wordmark with a small personal signature detail would work well; the signature should support, rather than carry, navigation readability.

**3. Visitor journey and page structure**

Design for two reading speeds: a quick scan for relevance and a deeper read for technical judgment.

```text
Indraneel                 Work  Experience  About  Contact  Resume

SOFTWARE ENGINEER
I turn complex workflows
into software people can use.       [Annotated project preview]

React interfaces, AWS workflows,
and full-stack products.
[Explore my work]  [View resume]
Vanguard · Previously actyv.ai · MS Computer Science, ASU

SELECTED WORK
[01  Large lead project: interface, problem, contribution, outcome]
[02  Onboarding and e-signatures]  [03  Research lab website]

EXPERIENCE          Compact career progression and key outcomes
LAB                Two or three well-explained experiments
ABOUT              Working approach, education, personal detail
CONTACT            Email, LinkedIn, GitHub, resume
```

Suggested hero copy is a draft grounded in existing portfolio content. Confirm the current role and project scope before publishing.

The first screen should include the professional identity, a clear value statement, one concrete work visual, and the work/resume actions. On mobile, place the headline and actions first, followed by a compact preview. Reduce decorative space to bring the first project closer.

Navigation uses **Work / Experience / About / Contact**, with a distinct Resume link. The lab can be discovered in the page without adding another top-level choice. Use anchor offsets so the header never covers a destination heading.

Create permanent, statically generated project pages, for example `/work/datahub/`, `/work/onboarding/`, and `/work/research-lab/`. Each should work on a direct visit or refresh and have a clear return link to the work section.

**4. Turn projects into evidence**

| Candidate                            | What it can demonstrate                                                                                                 | Material needed                                                                                                                                                        |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vanguard Datahub and AWS workflows   | React product work, data discovery, role-based interfaces, pipeline automation, collaboration with UX and data teams.   | A publishable description of personal ownership, an approved visual or clearly labeled reconstruction, key decisions, and an explanation of any reported time savings. |
| actyv.ai onboarding and e-signatures | Full-stack architecture, third-party integrations, identity/access decisions, paperless workflows, and team leadership. | A coherent user journey, clear separation of individual and team contributions, approved screenshots or diagrams, and supporting context for outcome claims.           |
| Shrivastava Lab website              | End-to-end ownership, information architecture, implementation, deployment, and work with a real stakeholder.           | Current screenshots, audience needs, specific design decisions, hosting details, and a checked public link.                                                            |

Select the final lead project by the strength of available evidence. If employer material is unavailable, lead with the lab website and explain the enterprise work through publishable diagrams and concise narratives.

Every case study follows the same reading structure:

1. **Summary:** the problem, audience, role, team context, timeline, and outcome.
2. **The challenge:** what made the work difficult and which constraints mattered.
3. **What I owned:** concrete responsibilities and collaboration boundaries.
4. **Decisions:** two or three choices, alternatives considered, and tradeoffs.
5. **The build:** product visuals and a readable architecture or workflow diagram.
6. **Results and reflection:** supported outcomes, limitations, and what could improve.
7. **Next step:** another case study, public code where available, or contact.

Existing claims such as hours saved, release-speed improvements, and cost savings are self-reported portfolio content. Confirm their basis and attribution before featuring them as headline figures. Use qualitative results where a numerical claim cannot be supported. Clearly label recreated interfaces and example data.

**5. Make the site engaging through useful interactions**

The signature interaction is an **annotated project preview**. A visitor switches between **Interface** and **Architecture**, then selects a numbered annotation to read a short engineering note. Example topics, where supported by the actual project, could include search behavior, caching, role-based access, or workflow orchestration.

The preview should provide a useful static image and caption before JavaScript loads. On touch devices, place the annotation list beneath the image. Each annotation is a real button with a visible selected state; the supporting text appears in normal reading order. No information depends on hover.

| Interaction                                   | Purpose                                                                       | Release priority                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| Annotated preview                             | Make technical judgment tangible while adding a memorable detail.             | First full release; one project only.            |
| Project image and link hover/focus treatment  | Clarify what opens and make exploration feel responsive.                      | First release.                                   |
| Grouped experience disclosures                | Keep the career story short while allowing a deeper read of earlier roles.    | First release.                                   |
| Copy-email action with announced confirmation | Make contacting Indraneel easy; retain a visible address and mail link.       | First release.                                   |
| Two or three lab experiments                  | Show curiosity in AI/ML or product engineering through real, documented work. | After the core case studies.                     |
| Project filters                               | Help visitors browse a larger collection.                                     | Add only when there is enough work to need them. |

Use ordinary page scrolling and a standard pointer. Invest the main creative effort in the work preview, project storytelling, and visual composition. Background animation should never compete with reading.

**6. Content changes**

Rewrite the hero to approximately 30–45 words including its supporting description. Keep the primary actions to **Explore my work** and **View resume**. Place GitHub and LinkedIn nearby as secondary links; move personal social profiles to the footer if retained.

Replace the standalone technology wall with three concise capability groups linked to evidence: **Interfaces**, **Systems**, and **Applied AI**. Include the AI group only where a project explains its actual contribution. Preserve useful technology tags on case studies.

Group the actyv.ai progression into one company story. Keep the current or most recent role prominent, with two or three strong accomplishments. Put ASU education and selected credentials in the about section. Retain the Sanskrit quote if it feels personally important, accompanied by a translation and context.

Keep blogs, talks, and podcasts absent until there is original content to share. Existing disabled template entries should not become visible during the redesign. Curated project descriptions should remain independent of missing GitHub descriptions or a failed data fetch. Availability should be an intentional, current statement.

**7. Technical approach**

For the full redesign, I recommend **Astro with TypeScript, static project pages, and React only for the few interactive components**. Most portfolio content is a document; this approach fits the proposed reading experience and gives each case study an HTML page. Astro documents both selective client interactivity and deployment to GitHub Pages. See [Astro islands](https://docs.astro.build/en/concepts/islands/) and [GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/).

This requires migrating the page shell and presentation components. If minimizing migration effort becomes the main constraint, React with Vite is a reasonable alternative, with a separate decision needed for prerendering project pages. Create React App is deprecated for new apps, and React recommends migration paths for existing apps. See [React's announcement](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).

Implementation work should include:

- Move React-specific content from `src/portfolio.js` into structured profile, experience, and project data. Author longer case studies in Markdown with validated metadata.
- Preserve `fetch.js`, the checked-in JSON snapshot approach, and the existing data validation tests. Use the local snapshot at build time for optional GitHub metadata. Core professional content and contact details should render independently.
- Build shared components for navigation, buttons, project previews, case-study layouts, disclosures, and the footer. Centralize color, typography, spacing, and motion tokens in CSS custom properties.
- Replace repeated Lottie illustrations and runtime company-logo color extraction with purposeful imagery and explicit project colors. Retain a dependency only when the final design needs it.
- Produce optimized AVIF/WebP images with dimensions and responsive variants. Lazy-load below-the-fold media; load the lead visual normally. Self-host subsetted fonts where practical.
- Give every project its own title, description, social preview, and canonical URL. Add a sitemap, a useful 404 page, and a local resume PDF if Indraneel can supply a publishable copy.
- Update deployment to the chosen build output, align formatting and validation checks with `main` and pull requests, and remove or reconcile the legacy manual deploy command. Choose a supported Node version compatible with the selected toolchain during implementation.
- Migrate meaningful UI tests to the new component setup while preserving the framework-independent snapshot validation coverage.

**8. Implementation phases and completion criteria**

The effort below is a planning estimate for one developer with project material available. Content preparation and asset approval may add elapsed time.

| Phase                                   | Approximate effort | Deliverable and exit condition                                                                                                                                             |
| --------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Content and narrative                | 1–2 days           | Three case-study outlines, confirmed role and contribution details, checked claims, selected visuals, and rewritten hero. The lead project has enough evidence to publish. |
| 2. Visual design                        | 1–2 days           | Desktop and mobile compositions for the hero, lead project, experience, and one case-study page. Typography, palette, and annotation behavior form one coherent direction. |
| 3. Foundation and first complete slice  | 1–2 days           | Static build and content model, shared tokens, navigation, hero, one project page, and contact. Direct project URLs work in a local production preview.                    |
| 4. Remaining content and interactions   | 2–3 days           | All selected case studies, grouped experience, about section, dark theme, and the single annotated preview. Every visible action works by keyboard and touch.              |
| 5. Verification and release preparation | 1–2 days           | Responsive checks, accessible controls, link checks, image optimization, metadata, successful build/data tests, and aligned deployment configuration.                      |

Expected total: roughly 6–11 focused development days, subject to available content. Review the visual composition after phase 2 and the complete first slice after phase 3, before extending the same system across the site.

**9. Launch requirements and success measures**

- In a five-second review, a visitor should identify the engineering focus and find Work and Resume. In a one-minute review, they should be able to describe one project, Indraneel's contribution, and an outcome. Test these tasks with a small group of representative readers.
- No horizontal scrolling at 320, 390, 768, 1024, and 1440px. Test long titles, 200% text zoom, narrow layouts, both themes, and direct visits to each project page. Essential controls should have a comfortable 44px touch area as a design target.
- Target WCAG 2.2 AA: semantic landmarks, logical headings, named controls, visible focus, keyboard access, useful alternative text, adequate contrast, and focus that remains visible below the header. Respect reduced-motion preferences as an additional requirement. Use automated checks plus manual review; automation alone cannot establish conformance. See [W3C's reference](https://www.w3.org/WAI/WCAG22/quickref/).
- Target field Core Web Vitals at the 75th percentile: LCP at or below 2.5s, INP at or below 200ms, and CLS at or below 0.1. Use lab measurements before launch and field measurements afterward when sufficient traffic exists. See [Web Vitals guidance](https://web.dev/articles/vitals).
- Start with a proposed homepage JavaScript budget below 150KB gzip and a lead-image budget around 200KB. Measure the actual output and optimize before adding optional effects. These are project budgets, not established standards or measured current performance.
- Check resume access, email, LinkedIn, GitHub, certificates, live project links, and all internal links. Ensure essential portfolio content still appears when optional metadata fails and remains readable without client-side JavaScript.
- Use the existing analytics setup to measure project opens, resume clicks, and contact actions. Compare trends after launch; establish a baseline before claiming improvement. Time on page alone is not the goal.

**Recommended first milestone:** a finished desktop and mobile composition for the introduction, one substantial featured project, and its case-study page. That makes the design direction and content depth concrete before the full rebuild.

**10. Implementation status and remaining work — November 3, 2026**

The core redesign is implemented on `codex/portfolio-revamp`. The sections above retain the original audit and proposal; this section records the current state.

| Phase                                   | Current state                                                                                                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Content and narrative                | Implemented. Five case studies cover Vanguard, RABiTPy, actyv.ai, InsureGPT, and the ASU lab website. Role details and Vanguard metrics use owner-supplied content; publication claims link to their sources.       |
| 2. Visual design                        | Implemented. Responsive editorial compositions, original illustrative diagrams, self-hosted fonts, and light/dark themes replace the template presentation.                                                         |
| 3. Foundation and first complete slice  | Implemented. Astro/TypeScript generates seven HTML routes, with shared layouts, validated Markdown, navigation, contact, metadata, sitemap, and a custom 404 page.                                                  |
| 4. Remaining content and interactions   | Implemented. The annotated React explorer, grouped career progression, research/community details, and three attributed recommendations are available. Core content and native disclosures work without JavaScript. |
| 5. Verification and release preparation | Local checks pass. Release, external-access verification, and the manual/field checks below remain.                                                                                                                 |

Local verification after cleanup:

- Astro diagnostics: 23 files, zero errors or warnings. Production build and snapshot validation pass.
- The suite includes 37 tests: 18 data-refresh tests, four generated-site tests, and 15 browser tests. Coverage includes all routes at 320, 390, 768, 1024, and 1440px, both themes, automated WCAG AA checks, keyboard interactions, unavailable storage, clipboard fallback, no-JavaScript navigation, and the GitHub Pages publishing marker.
- Additional browser checks verified recommendation disclosures by keyboard at narrow and wide viewports and with JavaScript disabled. Automated accessibility checks do not establish complete WCAG conformance.
- First-party JavaScript totals 74,706 bytes (73.0 KiB) gzip when combining all emitted JavaScript files and separately compressed homepage inline scripts. This is an artifact estimate, below the proposed 150 KiB budget; it excludes third-party Google Analytics and is not a measured network transfer total.
- The largest generated WebP screenshot is 131,956 bytes (128.9 KiB), below the proposed 200 KiB image budget. The lead Vanguard visual uses HTML/SVG rather than a raster image.
- Three cold-cache mobile Chrome runs against the local production preview recorded LCP at 504, 488, and 488ms and CLS at 0. The runs used a 390×844 viewport, 4× CPU slowdown, 150ms network latency, 1.6 Mbps download/750 Kbps upload settings, reduced motion, and no concurrent browser tests. These are local lab observations; production hosting and third-party analytics were not measured, and INP was not measured.
- Removed 39 obsolete tracked template files, two ignored `.DS_Store` files, 35 empty legacy directories, and the ignored CRA `build/` output. The two imported screenshots, license, local snapshot tools, and snapshot tests remain.
- The first live deployment exposed a hosting omission: GitHub Pages filtered `_astro/` because the publishing root lacked `.nojekyll`, leaving the CSS and optimized images unavailable even though they existed on `gh-pages`. The correction adds `public/.nojekyll`, verifies that the marker reaches `dist/`, and requires it in the pre-deployment tests. The correction must be redeployed before the live asset requests can be verified.

Remaining launch work:

1. Push the branch, run the GitHub pull-request checks, review and merge the change, and deploy through the existing GitHub Pages workflow. Smoke-test the published homepage, direct project URLs, images, and custom 404 behavior. This local commit does not publish the site.
2. Check the external résumé, certificate, source, publication, and live-project links as a signed-out visitor. Confirm the Google Drive résumé is current and publicly readable; automated internal-link tests do not establish external access.
3. Complete the representative-reader five-second/one-minute tasks from section 9, a manual screen-reader review, and a 200% text-zoom review. Keyboard, responsive, reduced-motion, and automated accessibility checks already have local coverage.
4. Verify the existing analytics events on the published domain, establish a baseline, and assess real-user Core Web Vitals when sufficient traffic exists. Field LCP, INP, and CLS targets are not established by a local build or a lab run.

Optional follow-ups from the original proposal: supply a local résumé PDF, create individual social-preview artwork for each project (the current pages share branded artwork but have their own titles, descriptions, and canonical URLs), and add a portrait or more documented experiments if useful. Project filters remain deferred until the collection needs them.
