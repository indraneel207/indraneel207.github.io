---
title: Connecting a conversation to a predictive model.
shortTitle: InsureGPT
client: Applied AI project · 2024
category: GPT + prediction API
summary: A prototype connecting a custom GPT to a Flask-hosted insurance premium model, bringing a conversational interface to a predictive workflow.
role: GPT & ML application development
context: Prototype · February–April 2024
outcome: A prototype connecting conversational input to a Flask-hosted prediction model through GPT actions.
tags: [Python, Flask, scikit-learn, pandas, GPT actions]
order: 4
featured: false
visual: insuregpt
resources:
  - label: Source code
    url: https://github.com/indraneel207/insurance_predictor_chatgpt_extension
---

## The challenge

A predictive model needs an interface before someone can use it. InsureGPT explores connecting a conversation to a model-backed API.

## What I owned

I developed a custom GPT with actions connected to a Flask server hosting an insurance premium model. The project used Python, scikit-learn, and pandas, with RandomForestRegressor and OneHotEncoder in the modeling workflow.

## How the pieces connect

The GPT provides the conversational interface, an action connects it to the Flask API, and the hosted model produces a prediction. The diagram illustrates that request-to-prediction path.

The [public repository](https://github.com/indraneel207/insurance_predictor_chatgpt_extension) contains the application, prediction code, and training notebook.

## The result

The project demonstrates a prototype combining conversational interaction with a predictive API: a connected path from user input to model inference.
