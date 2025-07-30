# Sustainable Score Calculator

This is a prototype web application for calculating a Suspra Score. The emphasis
is on correct implementation of the calculation and basic functionality for
data entry rather than cosmetics.

## Frameworks

### Vue

A reactive JavaScript framework to make it easier to build the user interface.

### Vue-router

The routing library for Vue, mapping components to URLs.

### Vuetify

A Material Design components for Vue.

### Vite

A build tool and development server that leverages ES modules during development and Rollup during production to create optimized bundles of code.

### IDB

A wrapper that improves the usability of the IndexedDB API for data persistence.

## Running the Code

In a terminal, install the project dependencies (only need do this once):

`npm install`

If your version of npm is too old, this might fail.  Use node version manager (`nvm`) to manage your versions of node:

```
nvm install 18
nvm use 18
```

Then the `npm install` command should work.

Start the development server:

`npm run dev`

## Project Team

Uncle Eric is handling the overall technical direction and making sure we don't do crazy things. Fred is pushing the project forward and will take over when the kids have to go back to work or school. Cordy is in charge of the survey wording, sequence of questions, and survey logic. Everett is in charge of user interface and data persistence. Ian is in charge of the sustainability scoring, making sure it corresponds to planetary boundaries or some other reasonable connection to environmental impact, both positive and negative.

## Deploy on Netlify

This is a single-page application (SPA) and therefore requires a rewrite rule as shown in the [Netlify documentation](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps).
