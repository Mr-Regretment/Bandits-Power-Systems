# Bandit's Power Systems

A personal library of fictional power systems, with complete guides to their mechanics, limitations, and use.

The website is built for reading. There are no accounts, submission forms, or upload dashboards. New systems are added directly to the collection and published with the site.

## Current library

### Transmatter Alchemy

> Transmatter Alchemy (T-M) is a magic system built on a simple premise: what if alchemy were governed by real chemistry — and at its most advanced, real nuclear physics — with an internal energy source standing in for the equipment a laboratory would normally require.

The complete 22-page guide covers core mechanics, Kern and the Cell, interruption and combat, ranks and society, and origins and notes.

[Original website](https://mr-regretment.github.io/Transmatter-Alchemy/) · [Source repository](https://github.com/Mr-Regretment/Transmatter-Alchemy)

### Infusion

> Infusion is a martial magic system in which divine Techniques are learned, stored as physical Symbols, and deployed through ordinary objects called Templates.

The complete 21-page guide covers divine Sources, Techniques and Symbols, Templates, preparation and reloading, authority, activation, combat practice, and mastery.

[Original website](https://mr-regretment.github.io/Divine-Transfusion/) · [Source repository](https://github.com/Mr-Regretment/Divine-Transfusion)

The original guide wording is preserved. During the build, every imported article's original `<main>` element is checked to ensure it has not changed. Collection navigation is added outside the original article content.

## Website features

- A homepage featuring the latest additions
- A searchable **Current Library** with sorting
- Complete multi-page guides with chapter navigation
- Custom illustrations for the collection entries
- Responsive layouts for desktop and mobile
- Embedded styles, fonts, illustrations, and collection data
- No backend required to read or search the published collection

## View locally

For a quick look, open `public/index.html` in your browser. Keep the `public/` folder together so links between pages continue to work.

To run the Node preview server, install Node.js 20 or newer, then run:

```bash
npm install
npm start
```

Open **http://localhost:3000**.

The Node server is optional for the published website. It is retained from an earlier version of the project; sign-in and write APIs are disabled, and the published pages do not depend on its database.

## Build the website

```bash
npm install
npm run build
```

The build creates the published pages in `public/`, embeds their reading assets, imports both complete guides, and generates content-integrity checks.

If the Node preview server is already running, restart it after rebuilding so its inline-script security hashes refresh.

## Publish with GitHub Pages

Only the generated **`public/` directory** needs to be hosted. No Google login configuration, database, or paid backend is needed.

### Option 1: Publish the files directly

Copy the **contents** of `public/` into the root of a separate publishing repository, or into a `docs/` folder. In that repository, open **Settings → Pages** and select the appropriate branch and folder.

GitHub Pages' branch-based publishing does not let you select an arbitrary `public/` folder. Use GitHub Actions if you want to publish directly from this repository's existing structure.

### Option 2: Deploy `public/` with GitHub Actions

In **Settings → Pages**, choose **GitHub Actions** as the source. Then create `.github/workflows/pages.yml` with the following configuration:

```yaml
name: Deploy website

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

This workflow publishes the already-built files. Run `npm run build` and commit the updated `public/` files whenever you change the source content. If your default branch is not `main`, change the branch name in the workflow.

## Adding or updating systems

1. Update the collection entries in `content/systems.json`.
2. Add or update the relevant guide source files.
3. Adjust entry illustrations or page templates if needed.
4. Run `npm run build`.
5. Check the homepage, library search, guide navigation, and mobile layout.
6. Commit the source changes and rebuilt files in `public/`.

The guide importer currently handles the two named guides. Adding a third complete guide also requires registering it in `tools/build-guides.js`; a collection entry alone does not import its pages.

## Project structure

```text
public/                  Published website; deploy this folder
  index.html             Homepage
  library.html           Searchable collection
  systems/               Complete imported guides
  css/                   Authoring stylesheet
  js/                    Authoring scripts
  fonts/                 Local fonts and their licenses
  images/                Collection illustrations
site-source/pages/       HTML templates for collection pages
source-guides/           Original guide source snapshots
content/                 Collection data, source records, integrity checks
tools/                   Build scripts
server.js                Optional local Node preview server
```

## Attribution and licenses

The two source guides are by **Mr-Regretment** and include the **Creative Commons Attribution-ShareAlike 4.0 International** license. Their license texts are retained alongside the imported guides as `LICENSE.txt`.

Source repository links are listed above. Imported source revisions are recorded in `content/guide-sources.json`, and article-integrity hashes are recorded in `content/guide-integrity.json`.

Barlow Condensed and IBM Plex Mono are included with their license files in `public/fonts/`.

The guide and font licenses apply to their respective materials; they do not, by themselves, assign a license to every other file in this repository.
