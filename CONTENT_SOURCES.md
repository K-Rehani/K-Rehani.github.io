# Content sources and editorial decisions

This is a maintenance record, not a website page. Sources were inspected on 6 October 2026 (India time). Names and relationships explicitly provided in the request take precedence over document metadata. No private address, phone number, or extracted document email was published.

## Summer projects

### TIFR, May–July 2024

Sources: the current public `K-Rehani/Stacking-Spectra` README and `TIFR Summer Project 2024 Report.pdf`, plus the supplied supervisor and dates.

The page describes spectral retrieval, common rest-frame grids, binning, sigma clipping, and comparison of stacks. It mentions the 100-object SDSS DR16 notebook example. SDSS DR16, BOSS DR16, and DESI EDR appear as surveys discussed in the report; the page does not claim independently verified runs on all three. The secondary black-hole recoil work is described as study with simulations, without inventing a completed numerical result.

Supervisor: https://www.tifr.res.in/~shadab.alam/

Report: https://github.com/K-Rehani/Stacking-Spectra/blob/main/TIFR%20Summer%20Project%202024%20Report.pdf

### NCRA–TIFR, May–July 2025

Sources: the current public `K-Rehani/Changing-Look-AGN-Detection` README and `NCRA project report 2025.pdf`, plus the supplied supervisor and dates.

The page centers the summer work: repeat-quasar selection, earlier/later spectra, plots, and trial difference measures. The current repository implementation is described separately. No confirmed changing-look discovery, universal line finder, survey completeness, or calibrated classifier is claimed. Historical trial counts were left out because the current repository does not independently reproduce them.

Supervisor: https://www.ncra.tifr.res.in/people/253

Report: https://github.com/K-Rehani/Changing-Look-AGN-Detection/blob/main/NCRA%20project%20report%202025.pdf

## Theory study with Prof. Sudarshan Ananth

The user supplied the overall August 2025–present period, supervisor, and ordered reading files. No exact month was assigned to an individual paper or calculation. The list below records all 20 supplied files and their role; they are not copied into the site.

| File number | Material | Role in the first version |
| --- | --- | --- |
| 1 | Griffiths, Chapter 12: electrodynamics and relativity | Foundational reading, marked done by the user |
| 2 | Vectors and index notation | Foundational reading, marked done |
| 3 | Electrodynamics Lagrange formalism | Foundational reading, marked done |
| 4 | Sarthak Parikh thesis | Reference, credited to its author |
| 5 | Mahendraprasad Mali thesis | Gravity reference, credited to its author |
| 6 | Sucheta Majumdar thesis | Gravity/supergravity reference, credited to its author |
| 7 | Srednicki, Chapters 1, 2, 33 | Selected QFT/Lorentz-group reading, marked done |
| 8 | Bengtsson, Bengtsson, Brink: cubic interactions | Light-cone reading, marked done |
| 9 | Zee, Sections I.1–I.3 | Introductory path-integral reading, marked done |
| 10 | Scherk and Schwarz: light-cone gravity | Partly studied, matching the filename |
| 11 | Goroff and Schwarz: D-dimensional gravity | Reference |
| 12 | Bengtsson, Cederwall, Lindgren: light-front actions | Studied reference; scanned PDF title checked with OCR |
| 13 | Quartic contributions working sheet, labelled NB | Study material; authorship not assigned to Kautik |
| 14 | Appendix C of N=8 supergravity paper | Reference for pure-gravity expressions, including visible comparison annotations |
| 15 | Quintic interaction vertex | Further reference, not claimed completed |
| 16 | Structure of gravity vertices / six-point interactions | Further reference, not claimed completed |
| 17 | Brink, Lindgren, Nilsson: N=4 Yang–Mills | Current reading, matching “doing” |
| 18 | N=8 supergravity Hamiltonian as a quadratic form | Reference |
| 19 | KLT relations from the Einstein–Hilbert Lagrangian | Reference |
| 20 | Gravitation and quadratic forms | Related reading; completion status not inferred |

Supervisor link: https://inspirehep.net/authors/1019716?ui-citation-summary=true

The first version's Notes section contains new short study guides and reading lists based on these materials. They are not transcriptions of personal handwritten lecture notes. No thesis, paper, or textbook is presented as Kautik's publication or redistributed as a download.

## Profile and unfilled details

Name, institution, Physics major, Mathematics minor, the research relationships, GitHub account, and junior-student welcome are supported by the request and supplied context. The site uses the general phrase “undergraduate studies” until the exact preferred degree title and dates are confirmed.

The notes repository was located and its README read: https://github.com/K-Rehani/Physics-Mathematics-Lecture-Notes. No notes PDFs were present. There are therefore no guessed per-note download links.

The official student email and LinkedIn profile were supplied explicitly for publication and are included on the Contact page.

No formal/audited course list was inferred from the titles of reference papers. Their categories are implemented but remain empty pending a confirmed list. Named extracurricular roles, grades, awards, degree dates, and a CV PDF remain unfilled.

## Design references

The provided pages by Maximilian Haensch, David Tong, Jaroslav Trnka, the KAIST QFT/String group, Niels Obers, Jonathan Heckman, and Adithya Rao were inspected through retrieved page content. They informed the simple identity, academic navigation, and separation of research and reading. No biography, visual asset, stylesheet, or page code was copied. The supplied Henriette Elvang Google Sites URL could not be retrieved.

## Technical sources

- Astro deployment guide: https://docs.astro.build/en/guides/deploy/github/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro Markdown: https://docs.astro.build/en/guides/markdown-content/

The repository pins exact installed package versions in package.json and package-lock.json. The extra `@astrojs/markdown-remark` package enables the remark/rehype math plugins with Astro 7.
