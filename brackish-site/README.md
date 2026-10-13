# Brackish — Website

Static site for **Brackish: Hampton Roads**. No build step, no framework, no database — just HTML, CSS and JS. Deploy it anywhere that serves static files.

## Quick deploy (2 minutes, no GitHub needed)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `brackish-site` folder into the browser.
3. Done — you get a live URL instantly. Add your custom domain (`brackishmag.com`) under Site settings → Domain management.

## Automatic deploys (recommended — this is what makes content hands-off)

1. Create a new GitHub repo (e.g. `brackish-site`) and upload this folder's contents.
2. In Netlify: Add new site → Import from Git → pick the repo.
3. Build settings: **no build command**, publish directory: `/` (repo root).
4. Every `git push` now rebuilds and publishes the site automatically in ~30 seconds.

## How new issues get published

Each issue is one HTML file in `/issues/` (copy an existing one as a template), plus one new row in `archive.html`. That's it — push, and it's live. The newsletter email itself goes out via Beehiiv (free tier); swap the placeholder signup form in `index.html` for your Beehiiv embed code when ready.

## Forms

The newsletter signup, Spotlight submission, advertiser and contact forms use **Netlify Forms** (`data-netlify="true"`). Submissions land in your Netlify dashboard → Forms. No backend code needed. (Forms activate once the site is deployed on Netlify — they won't work from a local file preview.)

## Structure

```
index.html            homepage
archive.html          all stories/issues, filterable by category
issues/               newsletter editions (one HTML file each)
spotlight.html        interview archive
submit.html           "Get the Spotlight" submission form
advertise.html        media kit + advertiser form
about.html            story, editorial standards, contact form
guides/  stories/     feature articles
css/style.css         entire design system
js/main.js            mobile nav, search overlay, archive filter
assets/               logo + photography
```
