# Editing your website

Most changes involve plain text files. You should not need to edit a layout to add a project, note, or course.

## 1. How the project is organized

- `src/content/` contains your writing. A Markdown file is ordinary text with headings, paragraphs, lists, and links.
- `src/data/` contains small settings files for your profile and navigation.
- `src/pages/` decides which pages exist and gathers content to display.
- `src/components/` contains reusable pieces such as project entries and resource links.
- `src/layouts/Base.astro` supplies the shared page frame, metadata, and navigation.
- `src/styles/global.css` controls the appearance.
- `public/` holds files copied to the website as-is, such as a photo or your own PDF.
- `templates/` contains examples to copy. These are not published.
- `dist/` is generated when you build. Do not edit it; the next build replaces it.

The metadata at the top of a content file is called **frontmatter**. It sits between two lines containing `---`. Keep indentation and quotation marks intact. The build checks its structure and tells you if something is missing.

## 2. Run and check locally

Install Node.js 24. In the project folder run `npm ci` once, then `npm run dev`.

After editing, run `npm run verify`. If it reports an error, read the file name and message before publishing. Run `npm run preview` to view the built site. For mobile review, use the browser's responsive/device mode at about 390 px and 768 px wide. Check both themes, the menu, links, keyboard focus, and text at increased zoom.

## 3. Add a research project

1. Copy `templates/research.md` into `src/content/research/`.
2. Rename it to something short, such as `masters-thesis.md`.
3. Fill in the metadata and write the description below it.
4. Change `draft: true` to `draft: false` when ready.

Example:

```yaml
---
title: "My project title"
institution: "Institution name"
supervisor: "Prof. Name"
supervisorUrl: "https://example.org/profile"
dates: "May–July 2027"
start: "2027-05-01"
category: "Summer research"
summary: "One or two sentences explaining what I worked on."
topics: ["Topic one", "Topic two"]
resources:
  - label: "Project report"
    kind: "pdf"
    url: "https://example.org/my-report.pdf"
draft: false
---
```

`start` is the sortable date; `dates` is the text visitors see. Newer projects appear first. Omit the supervisor fields if not applicable. Use `resources: []` if there are no public files. Only real resources should be listed.

The file automatically appears on Home and Research, and gets its own page. A file named `masters-thesis.md` becomes `/research/masters-thesis/`.

Write in the first person, explain your own work, and separate what you studied from what you produced. A paper in your bibliography is not your publication.

## 4. Add a note

Copy `templates/note.md` to `src/content/notes/`, rename it, and edit it.

- `subject` groups notes on the Notes page. Reuse the same spelling to keep them together.
- `order` sets the display order; smaller numbers appear first.
- `kind` is `Personal notes`, `Study guide`, or `Reading list`.
- `draft: true` hides unfinished entries, including their individual URLs and sitemap entries.

### External PDF (recommended for keeping this repository small)

Upload your own PDF to the notes repository or another public location, open the actual file, and copy its URL. Put it under `resources`:

```yaml
resources:
  - label: "Lecture notes"
    kind: "pdf"
    url: "https://github.com/K-Rehani/Physics-Mathematics-Lecture-Notes/blob/main/path/to/your-file.pdf"
```

The example path must be replaced with a file that exists. A GitHub `blob` URL opens GitHub's file page and PDF preview. A Drive link works too; check it in a signed-out window so readers do not encounter a permission wall.

### PDF stored with the site

Put a small PDF you own in `public/notes/my-notes.pdf`, and use `url: "/notes/my-notes.pdf"` in the resource metadata. The reusable resource component automatically adds a GitHub Pages project prefix when needed.

A PDF is a normal file: linking to it does not require a special web framework or PDF viewer. Embedded viewers are not included; visitors open the resource when they choose. Large PDFs are better kept outside this website repository.

### Native mathematical notes

Write the note below its metadata. Inline mathematics uses `$...$`; a displayed equation uses `$$` on separate lines:

```markdown
For my conventions, $p^2 = -m^2$ in units with $c=1$.

$$
\eta_{\mu\nu} = \operatorname{diag}(-1,+1,+1,+1).
$$
```

Use fenced code blocks with a language name for highlighted code, for example three backticks followed by `python`. Mathematics is rendered during the build; there is no browser-side math engine or external CDN.

To link between native content pages while supporting project subpaths, use relative links. From `/research/project-name/` to `/notes/note-name/`, write `../../notes/note-name/`. For downloadable files, prefer the `resources` field so paths are handled for you.

## 5. Add a course

Copy `templates/course.md` into `src/content/courses/`. Choose exactly one category:

- `Formal coursework`
- `Audited coursework`
- `Independent study / reading`

Only groups with published entries appear. `status` can say `Completed`, `In progress`, or describe the scope of selected reading. `summary` is what appears on the Courses page. This page does not publish the Markdown body. Do not put grades into the metadata. The first version includes only reading supported by the supplied files; add the credited/audited list when confirmed.

## 6. Change your biography and education

Edit `src/content/pages/home.md` for the biography. Edit `src/content/pages/cv.md` for CV highlights. Update `role`, `degree`, `description`, and `institution` in `src/data/profile.json` when your position changes. The `description` field also supplies the default search-engine description.

JSON needs double quotes around keys and string values, and commas between entries. Keep missing optional strings as `""`; do not delete the keys. A comma after the final entry is not valid JSON.

## 7. Add or replace your photograph

Put a reasonably compressed image in `public/images/portrait.jpg` (create the `images` folder if needed). About 400–800 pixels across is sufficient for the small portrait. In `profile.json` set:

```json
"photo": "/images/portrait.jpg",
"photoAlt": "Portrait of Kautik Rehani"
```

Leave `photo` empty to show no picture. Only use an image you are comfortable publishing.

## 8. Change your CV and contact links

In `profile.json`, fill `cvUrl` with the public link to your CV PDF. This automatically shows a prominent Full CV link on the CV page. A local file also works: put it in `public/cv.pdf` and set `cvUrl` to `/cv.pdf`.

Fill `email` with only the email address; the site creates the `mailto:` link. Fill `linkedin` with your profile URL. Keep any unwanted field empty. Do not copy phone numbers or home addresses into the site.

## 9. Add a navigation section

For a simple new page such as Talks:

1. Create `src/pages/talks.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Talks" description="Talks and presentations by Kautik Rehani.">
  <h1>Talks</h1>
  <p>Add your talk information here.</p>
</Base>
```

2. Add `{ "label": "Talks", "href": "/talks/" }` to the array in `src/data/navigation.json` (with commas between entries).

The desktop and mobile menus both update. For a larger repeated section such as Publications, use the research collection as a model: add its schema, content folder, and list/detail pages. Do this when there is actual content to show.

Courses already exists and is linked from the sidebar, CV, Notes, and mobile menu. You can move it into the main navigation by adding it to the navigation array and removing the secondary sidebar link in `Base.astro`.

## 10. Change colours and fonts

The first two rules in `src/styles/global.css` define dark/light colours. Change `--bg`, `--side`, `--text`, `--muted`, and `--accent` there. Check that text and links still contrast with the backgrounds.

`--serif` is the heading font and `--sans` the body font. The defaults use fonts already on the reader's device, so there are no remote font requests. Avoid changing layout rules unless you want to redesign the site.

## 11. Publish changes

After a local edit:

```bash
npm run verify
git add .
git commit -m "Add notes on differential geometry"
git push
```

The Actions workflow rebuilds the website. If it fails, GitHub keeps the previous successful deployment. Open the failed run to read the error. If dependencies change, commit both `package.json` and `package-lock.json`.

You can also edit Markdown directly on GitHub with the pencil icon. Commit the change to `main` and wait for Actions. For more substantial changes, use a branch and pull request first.

Do not upload `node_modules/`, `dist/`, or `.astro/`. Git ignores these. The math CSS/fonts in `public/math/` are generated automatically and also ignored.

## 12. Undo a bad change

If a change is already committed and pushed, use a new reverting commit rather than rewriting shared history:

```bash
git log --oneline
# Find the commit you want to undo, then replace COMMIT_ID below.
git revert COMMIT_ID
git push
```

For an uncommitted edit to a single file, `git restore path/to/file` discards that edit. Use it only if you do not want to keep the changes. Copy the file elsewhere first if unsure.

GitHub's file History view lets you see earlier versions. A merged pull request can also be reverted from its page.

## Normally leave these alone

- `src/layouts/` and `src/components/`: shared page structure.
- `src/content.config.ts`: allowed metadata fields and validation.
- `astro.config.mjs`: build, mathematics, sitemap, and deployment URL configuration.
- `.github/workflows/deploy.yml`: automated build/deployment.
- `scripts/`: build helpers and verification.
- `package-lock.json`: generated dependency lockfile; do not hand-edit.

For routine content updates, the files in `src/content/` and `src/data/` are enough.
