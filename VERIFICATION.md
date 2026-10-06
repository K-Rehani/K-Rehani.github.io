# Verification of the first version

- Production build: 14 static HTML pages generated successfully.
- Link check: 300 internal links and asset references resolved.
- Root and project-subpath builds were both checked.
- Theme toggle: dark/light switching, labels, and stored preference checked.
- Storage unavailable: the theme control still works.
- Mobile menu: navigation and Escape close the menu, with focus returned after Escape.
- Dark/light text colours pass a 4.5:1 minimum contrast check against both page and sidebar backgrounds.
- KaTeX output was confirmed on the relativity study page.
- Favicon, metadata, sitemap, robots.txt, and 404 page are present.
- Source files contain no uploaded third-party PDFs or personal contact details extracted from document metadata.

Browser screenshots, actual device layout, and live keyboard interaction have not been inspected in this environment. Review the deployed site on desktop and mobile in both themes. External resources are represented as external links; future availability of another website cannot be guaranteed.

The deployment workflow is included. GitHub Pages must be enabled with GitHub Actions as its publishing source in the repository settings.
