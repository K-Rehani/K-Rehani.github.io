---
title: "Searching for changing-look AGN"
institution: "NCRA–TIFR, Pune"
supervisor: "Prof. Ishwara Chandra"
supervisorUrl: "https://www.ncra.tifr.res.in/people/253"
dates: "May–July 2025"
start: "2025-05-01"
category: "Summer research"
topics: ["AGN variability", "SDSS", "Optical spectroscopy", "Python"]
summary: "Comparing repeat SDSS quasar spectra to look for changes in broad emission lines and identify observations worth examining more closely."
resources: [{"label": "Project report", "kind": "pdf", "url": "https://github.com/K-Rehani/Changing-Look-AGN-Detection/blob/main/NCRA%20project%20report%202025.pdf"}, {"label": "Code", "kind": "code", "url": "https://github.com/K-Rehani/Changing-Look-AGN-Detection"}]
---


During summer 2025, I worked with Prof. Ishwara Chandra at NCRA–TIFR on comparing optical spectra of active galactic nuclei (AGN). The aim was to find objects whose spectra changed between observations, with particular interest in the appearance or disappearance of broad emission lines.

## The question

An AGN can look different at different times. To look for a possible changing-look event, we need to compare spectra of the same object and examine its broad emission lines. A large overall flux difference can also come from continuum variability or differences in calibration, so the lines need to be checked separately.

## My work

I used the SDSS DR16Q catalog to select quasars with repeat observations, identify earlier and later spectra, and compare them over their common wavelength range. I made spectrum and difference-spectrum plots and tried an integrated flux-difference measure to help decide which pairs to inspect more closely, including a window around Hβ.

This work gave me practice with FITS catalogs, observation identifiers, redshift corrections, wavelength coverage, and the difficulties of comparing spectra taken at different epochs.

## Outcome and code

The summer work produced a repeat-spectrum selection and comparison workflow, diagnostic plots, and a project report. The linked repository includes a Python implementation with measurements of selected emission lines, simple fits to broad hydrogen lines, and comparison plots. It also includes synthetic examples for checking the measurements.

The project provides a starting point for reviewing possible changing-look objects; it does not report a confirmed changing-look discovery. Most of the work was done in summer 2025. I uploaded it to GitHub later and have made small updates to the code and documentation since then.
