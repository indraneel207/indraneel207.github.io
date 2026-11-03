# Lighthouse review — November 3, 2026

Reviewed the owner-supplied Lighthouse 13.5.0 JSON for `https://indraneel207.github.io/`, captured at 23:27:04 UTC. This is the supplied report's baseline, not a new Lighthouse run after the changes below.

| Category       | Reported score |
| -------------- | -------------- |
| Performance    | 100            |
| Accessibility  | 100            |
| Best Practices | 100            |
| SEO            | 100            |

Reported mobile metrics: FCP 1.2s, LCP 1.2s, Speed Index 1.2s, total blocking time 40ms, and CLS 0.043. The run used simulated throttling and included injected browser-extension scripts. A navigation audit does not establish real-user INP or field Core Web Vitals.

## Corrections implemented locally

- **Five accessible-name mismatches:** the brand link's overridden name omitted its visible monogram, and four preview links overrode substantial visible text. The brand now derives its name from the visible name with a decorative monogram. Each project card has one native title link whose clickable area covers the preview and card, with a visible focus outline. The visual's captions and alternative text remain available. See [WCAG's label-in-name guidance](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html).
- **Regression coverage:** `label-content-name-mismatch` is explicitly enabled in the existing light/dark accessibility checks. The supplied report gives this audit zero scoring weight, explaining why its five failures coexist with an accessibility score of 100. A separate rule-only check against the updated local build found zero violations. The project navigation test also checks that the card has one link and that clicking its preview still opens the case study.
- **Screenshot delivery:** added 320, 640, and 960px variants, adjusted `sizes` for card and case-study layouts, and reduced WebP quality from 80 to 75. At the report's 412px viewport and 1.75 device-pixel ratio, local Chrome now selects the 640px onboarding image at 38,004 bytes, versus the report's 800px image at 68,390 bytes: approximately 44% fewer image bytes. Desktop and mobile screenshots were visually reviewed.
- **Font discovery:** preloaded the existing self-hosted Latin Manrope variable font. The report attributes the explorer's layout shift partly to font loading. This moves discovery ahead of the stylesheet request; its effect on Lighthouse CLS needs a fresh run after deployment.

## Interpreting the remaining warnings

- **Minify JavaScript:** all seven listed resources use `chrome-extension://` URLs. The reported 60 KiB saving concerns injected extension code.
- **Unused JavaScript:** the 200 KiB estimate combines about 95 KiB of extension code, 71 KiB from Google Analytics, and 34 KiB from React's client runtime. The interactive explorer uses React, and a page-load coverage snapshot does not exercise its search, tabs, and annotations. Analytics and the interactive implementation are retained.
- **Cache lifetimes:** the report and a direct live response check show `Cache-Control: max-age=600` for the stylesheet. Longer HTTP caching is a hosting/CDN follow-up. Adding asset filenames or HTML metadata cannot change that response header.
- **Critical request chains:** the report lists a shared stylesheet and self-hosted fonts, with no useful extra origin suggested for preconnection. Main-font preloading addresses one discovery delay. The supplied page already achieves 1.2s LCP; further changes should be guided by repeated clean-browser measurements. See [Chrome's explanation of performance scoring and variation](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/).

## Validation and next measurement

Astro type checking, the production build, 22 data/generated-site tests, and all 15 browser tests pass. The deployed stylesheet now returns HTTP 200, confirming that the earlier missing-asset problem has cleared. The changes in this review are local and require deployment.

After deployment, rerun Lighthouse in a clean Chrome profile with extensions disabled, using the same viewport and throttling settings. Compare the accessible-name audit, selected screenshot size, and CLS across repeated runs; retain the original report as the before measurement.
