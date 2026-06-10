# Internal Link Audit Report

Date: 2026-06-10
Site: https://dattasable.com
Audit type: Local source-level internal linking audit

## Summary

The reported issue was: "Page has only one dofollow incoming internal link" for 15 URLs.

Fix status: Addressed in source.

Internal links were added or confirmed from hub and related-content surfaces:

- `/blog` through `components/BlogList.tsx`
- `/templates` through `app/templates/page.tsx`
- `/knowledge` through `app/knowledge/page.tsx`
- `/glossary` through `app/glossary/page.tsx`
- `/dashboards` through `app/dashboards/page.tsx`
- `/knowledge/data-engineering` through `components/RelatedContent.tsx`
- Global navigation where already present through `components/navigationData.tsx`

Validation:

- Type check passed with `npx.cmd tsc --noEmit`.
- Local source search confirms every flagged URL now appears in internal link paths.

Limit:

- This is a local code audit, not a live production crawl. The SEO warning may only clear after deployment and recrawl.

## URL Audit

| URL | Internal sources found | Status |
| --- | --- | --- |
| `/lp/gemini-seo-pipelines-for-marketers` | `/templates`, `/knowledge`, `/glossary`, related assets | Fixed |
| `/blog/psychology-of-high-fidelity-dashboard-design` | `/blog`, `/dashboards` | Fixed |
| `/templates/b2b-retention-post-blueprint` | `/templates`, `/knowledge` | Fixed |
| `/templates/saas-product-schema-blueprint` | `/templates`, `/knowledge`, related assets | Fixed |
| `/blog/execution-chain-infrastructure-explained` | `/blog`, `/dashboards`, `/knowledge/data-engineering`, related assets | Fixed |
| `/dashboards/interactive` | `/dashboards`, `/knowledge`, global navigation | Fixed |
| `/blog/natural-language-query-engines` | `/blog`, `/dashboards`, related assets | Fixed |
| `/blog/mastering-autonomous-ai-agents-workflows-2026` | `/blog`, `/knowledge` | Fixed |
| `/knowledge/comparisons` | `/knowledge`, `/glossary`, global navigation | Fixed |
| `/blog/how-ai-agents-are-replacing-apps-2026` | `/blog`, `/knowledge` | Fixed |
| `/templates/high-ctr-meta-structures` | `/templates`, `/knowledge`, `/glossary` | Fixed |
| `/blog/nextjs-15-react-19-performance-manifesto-2026` | `/blog`, `/knowledge` | Fixed |
| `/blog/deep-work-protocol-technical-focus-2026` | `/blog`, `/knowledge` | Fixed |
| `/dashboards/sales-pipeline` | `/dashboards`, `/knowledge`, global navigation | Fixed |
| `/glossary/few-shot-prompting-strategies` | `/glossary`, `/knowledge` | Fixed |

## Evidence By File

### `components/BlogList.tsx`

Added a "Priority Reading Paths" block linking to:

- `/blog/psychology-of-high-fidelity-dashboard-design`
- `/blog/execution-chain-infrastructure-explained`
- `/blog/natural-language-query-engines`
- `/blog/mastering-autonomous-ai-agents-workflows-2026`
- `/blog/how-ai-agents-are-replacing-apps-2026`
- `/blog/nextjs-15-react-19-performance-manifesto-2026`
- `/blog/deep-work-protocol-technical-focus-2026`

### `app/templates/page.tsx`

Added a "Priority Asset Paths" block linking to:

- `/lp/gemini-seo-pipelines-for-marketers`
- `/templates/b2b-retention-post-blueprint`
- `/templates/saas-product-schema-blueprint`
- `/templates/high-ctr-meta-structures`

### `app/knowledge/page.tsx`

Added a "Priority Knowledge Paths" block linking to:

- `/knowledge/comparisons`
- `/glossary/few-shot-prompting-strategies`
- `/dashboards/interactive`
- `/dashboards/sales-pipeline`
- `/lp/gemini-seo-pipelines-for-marketers`
- `/templates/saas-product-schema-blueprint`
- `/templates/b2b-retention-post-blueprint`
- `/templates/high-ctr-meta-structures`
- `/blog/mastering-autonomous-ai-agents-workflows-2026`
- `/blog/how-ai-agents-are-replacing-apps-2026`
- `/blog/nextjs-15-react-19-performance-manifesto-2026`
- `/blog/deep-work-protocol-technical-focus-2026`

### `app/glossary/page.tsx`

Added a "Related Lexicon Paths" block linking to:

- `/glossary/few-shot-prompting-strategies`
- `/lp/gemini-seo-pipelines-for-marketers`
- `/templates/high-ctr-meta-structures`
- `/knowledge/comparisons`

### `app/dashboards/page.tsx`

Added a "Dashboard Research Paths" block linking to:

- `/dashboards/interactive`
- `/dashboards/sales-pipeline`
- `/blog/psychology-of-high-fidelity-dashboard-design`
- `/blog/natural-language-query-engines`
- `/blog/execution-chain-infrastructure-explained`

### `components/RelatedContent.tsx`

Expanded related assets linking to:

- `/blog/execution-chain-infrastructure-explained`
- `/blog/natural-language-query-engines`
- `/lp/gemini-seo-pipelines-for-marketers`
- `/templates/saas-product-schema-blueprint`

## Recommendations

1. Deploy the changes.
2. Submit or refresh the sitemap in Google Search Console if needed.
3. Re-run the SEO crawler after deployment.
4. If the warning persists, add contextual in-body links inside closely related articles.

