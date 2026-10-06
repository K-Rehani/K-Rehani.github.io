---
title: "Stacking spectra of galaxies and quasars"
institution: "TIFR, Mumbai"
supervisor: "Prof. Shadab Alam"
supervisorUrl: "https://www.tifr.res.in/~shadab.alam/"
dates: "May–July 2024"
start: "2024-05-01"
category: "Summer research"
topics: ["Spectral stacking", "Quasars", "SPARCL", "Python"]
summary: "Building a Python workflow to put optical spectra on a common rest-frame wavelength grid and compare simple and inverse-variance-weighted stacks."
resources: [{"label": "Project report", "kind": "pdf", "url": "https://github.com/K-Rehani/Stacking-Spectra/blob/main/TIFR%20Summer%20Project%202024%20Report.pdf"}, {"label": "Notebook & code", "kind": "code", "url": "https://github.com/K-Rehani/Stacking-Spectra"}]
---


I spent summer 2024 at TIFR Mumbai working with Prof. Shadab Alam on stacking optical spectra of galaxies and quasars. The motivation was to combine spectra to make shared spectral features easier to study when individual observations are noisy.

## My work

I developed a Python notebook to retrieve spectra through SPARCL, account for redshift, organize them over a common wavelength range, and compare unweighted and inverse-variance-weighted stacks. The project involved wavelength binning, outlier handling through sigma clipping, and plotting the resulting spectra.

The report discusses SDSS DR16, BOSS DR16, and DESI EDR. The saved notebook example uses a sample of 100 SDSS DR16 quasars. The project helped me understand both the usefulness of stacking and the care needed when combining measurements with different uncertainties and coverage.

## Outcome

The main outputs are the spectral-stacking notebook, saved comparison plots, and my summer project report. The repository also includes notes about the implemented methods and how to rerun the notebook.

Alongside the spectroscopy project, I learned about recoil velocities from black-hole mergers and worked with simulations as an additional part of the summer study.
