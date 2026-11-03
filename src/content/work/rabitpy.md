---
title: Making bacterial motion easier to study.
shortTitle: RABiTPy
client: BMC Bioinformatics · 2025
category: Published research software
summary: An open-source Python pipeline for bacterial tracking and motion analysis, published in BMC Bioinformatics. Connecting microscopy recordings to usable trajectories.
role: Software developer · Equal-contribution author
context: Research collaboration at ASU · Published May 18, 2025
outcome: A published, open-source research tool that brings cell detection, tracking, and motion analysis into one workflow, distributed as a Python package on PyPI.
tags: [Python, Computer vision, Omnipose, TrackPy, Jupyter]
order: 2
featured: true
visual: research
resources:
  - label: Read the paper
    url: https://link.springer.com/article/10.1186/s12859-025-06145-w
  - label: Source code
    url: https://github.com/indraneel207/RABiTPy
  - label: Python package
    url: https://pypi.org/project/RABiTPy/
---

## The challenge

Studying bacterial movement means turning microscopy recordings into identifiable cells, trajectories, and measurements. The engineering challenge is connecting those steps in a tool researchers can work with.

RABiTPy brings image processing, AI-assisted segmentation, and motion analysis into an open-source Python workflow.

## What I owned

I created the RABiTPy software and integrated multiple modalities, building on preliminary tracking work by my collaborators. I also contributed to the project's conception and manuscript.

The [paper's contribution statement](https://link.springer.com/article/10.1186/s12859-025-06145-w#author-information) documents that work and identifies Samyabrata Sen and me as equal-contribution authors. This was a research collaboration with Sen, Jitendrapuri Gosai, and Abhishek Shrivastava.

## Software design

### Separate the pipeline into usable stages

The package exposes four main classes: Capture, Identify, Tracker, and Stats. Each stage passes its output to the next, giving the workflow a clear structure from input frames through analysis.

### Support different identification methods

Identification supports thresholding and AI-based masking with Omnipose. The shared workflow lets researchers use the method that fits their images before moving into tracking.

### Make trajectories useful for analysis

The tracker links identified organisms across frames and filters tracks. Stats then supports measurements such as speed and movement patterns, connecting detection to the research question.

The [package documentation](https://pypi.org/project/RABiTPy/) and [source walkthrough](https://github.com/indraneel207/RABiTPy/blob/main/walkthrough.ipynb) describe these stages and provide an example workflow.

## The result

RABiTPy is distributed on PyPI and its accompanying work was published in BMC Bioinformatics in May 2025. The project connects software development with an accessible workflow for scientific analysis.

## About the illustration

The trajectory graphic is a conceptual illustration of the workflow. It does not show experimental data or reproduce a figure from the publication.
