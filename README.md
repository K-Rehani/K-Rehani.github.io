# Kautik Rehani — academic website

A small, static academic website built with Astro, Markdown, CSS, and a little JavaScript. The starting design is dark; visitors can switch to light mode. There is no database, account system, contact form, or paid service.

## Start here

1. Install **Node.js 24** (which includes npm).
2. Open a terminal in this folder — the one containing `package.json`.
3. Run:

```bash
npm ci
npm run dev
```

Open the local address printed in the terminal. Leave the terminal running while editing. Press Ctrl+C to stop.

To check the production version:

```bash
npm run verify
npm run preview
```

`verify` builds the site, checks generated pages and internal links, and checks the theme/menu JavaScript. Browser layout inspection is a separate check.

## Files you will usually edit

| What you want to change | File or folder |
| --- | --- |
| Name, email, GitHub, LinkedIn, photo, CV link | `src/data/profile.json` |
| Short biography | `src/content/pages/home.md` |
| CV highlights | `src/content/pages/cv.md` |
| Research projects | `src/content/research/` — one Markdown file per project |
| Notes and reading guides | `src/content/notes/` — one Markdown file per entry |
| Courses | `src/content/courses/` — one Markdown file per course |
| Sidebar links | `src/data/navigation.json` |
| Colours, typefaces, spacing | `src/styles/global.css` |

`CONTENT_GUIDE.md` explains each edit step by step, with examples. Copyable starting files are in `templates/`.

## Your GitHub Pages website

Repository: https://github.com/K-Rehani/K-Rehani.github.io

Website address: https://k-rehani.github.io/

The source files live in this repository. The deployment workflow builds the website whenever changes are pushed to `main`. Pull requests build and check the site without deploying.

### Enable Pages once

1. In this repository open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Build and deploy academic website**. If a run failed before Pages was enabled, rerun it or select **Run workflow**.
4. Once deployment succeeds, open https://k-rehani.github.io/.

For routine edits, follow `CONTENT_GUIDE.md`. You can edit Markdown directly on GitHub, or clone this repository to work locally:

```bash
git clone https://github.com/K-Rehani/K-Rehani.github.io.git
cd K-Rehani.github.io
npm ci
npm run dev
```

The deployment workflow follows Astro's official GitHub Pages workflow and adds the project's verification command. Documentation: https://docs.astro.build/en/guides/deploy/github/

### If you prefer a different repository name

A repository such as `academic-website` will normally publish at `https://k-rehani.github.io/academic-website/`. The configuration uses `GITHUB_REPOSITORY` during Actions builds to infer both the owner and base path. You do not need to change page links.

To test a project-path build locally in Bash/WSL:

```bash
GITHUB_REPOSITORY=K-Rehani/academic-website npm run verify
```

For a custom domain, set `SITE_URL` to the complete origin and `SITE_BASE` to `/` in the build environment, and configure the domain in GitHub Pages. No custom domain is needed for free hosting.

## What is included

- Home, Research, Notes, CV, Contact, Courses, and a useful 404 page.
- Three research entries: ongoing IISER study, NCRA 2025, and TIFR 2024.
- Four subject-based study/reading pages based on the supplied material.
- Content collections: new Markdown entries appear automatically.
- Optional external PDF links, repository links, and local files.
- Mathematics rendered at build time with KaTeX, with local CSS/fonts; syntax-highlighted code blocks.
- Dark/light themes, mobile navigation, keyboard focus styles, a skip link, and reduced-motion rules.
- Page descriptions, Open Graph metadata, canonical links, favicon, sitemap, and robots.txt.
- A lockfile and automated GitHub Pages deployment.

Reports link to their existing GitHub files. Third-party PDFs, book extracts, survey data, and the uploaded theses are not bundled.

## Details still to add

- A public email address you want shown on the website.
- Your full CV PDF URL and, if desired, a LinkedIn URL and photograph.
- Exact degree title and education dates, if you want more detail than “undergraduate studies”.
- A confirmed list of formal and audited courses, including which are ongoing.
- Named extracurricular activities and roles you want included.
- Your own notes PDFs and their exact public URLs. The notes repository currently has a README but no notes PDFs.
- Individual titles/dates and write-ups for further semester projects, if you want them separated from the ongoing light-cone study.

Missing email, LinkedIn, photo, and CV links are deliberately empty in the profile settings. Their components appear automatically once you fill the corresponding field. No private contact information from PDFs has been copied into the site.

See `CONTENT_SOURCES.md` for the basis of the project descriptions and `VERIFICATION.md` for checks and remaining manual review.
