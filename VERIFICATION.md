# Verification

- Production build: main content pages and redirects generated successfully.
- Link check: internal links, assets, and moved-reading-page destinations resolved.
- Root and project-subpath builds were both checked.
- Theme toggle: dark/light switching, labels, and stored preference checked.
- Storage unavailable: the theme control still works.
- Mobile menu: navigation and Escape close the menu, with focus returned after Escape.
- Dark/light text colours pass a 4.5:1 minimum contrast check against both page and sidebar backgrounds.
- KaTeX output was confirmed on the Ananth project page.
- Favicon, metadata, sitemap, robots.txt, and 404 page are present.
- The sidebar has no separate scrolling area; the kr. mark appears only in the favicon.
- All 20 numbered reading items are included under the Ananth project.
- Source files contain no uploaded third-party PDFs or personal contact details extracted from document metadata.

Browser screenshots, actual device layout, and live keyboard interaction have not been inspected in this environment. Review the deployed site on desktop and mobile in both themes. External resources are represented as external links; future availability of another website cannot be guaranteed.

The deployment workflow is included. GitHub Pages must be enabled with GitHub Actions as its publishing source in the repository settings.
