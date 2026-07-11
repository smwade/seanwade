# Add a New Tool to seanwade.com/tools/

Add a new standalone mini-project (single-file HTML tool) to the site.

## Arguments

`$ARGUMENTS` — describe the new tool (name + what it does). Example: `cat-drawing — a canvas tool for drawing cats`

## Steps

1. **Determine slug and title** from `$ARGUMENTS`. Slug is lowercase-hyphenated (e.g. `cat-drawing`).

2. **Copy or create the HTML file**:
   - If the source HTML already exists: copy it to `public/tools/<slug>/index.html`
   - If creating from scratch: write `public/tools/<slug>/index.html`

3. **Add a card** to the `tools` array in `src/app/tools/page.tsx`:
   ```ts
   {
     title: "<Title>",
     description: "<One sentence description>",
     href: "/tools/<slug>/",
   },
   ```

4. **Add sitemap entry** in `src/app/sitemap.ts`:
   ```ts
   {
     url: `${BASE_URL}/tools/<slug>/`,
     lastModified: new Date(),
     changeFrequency: "monthly",
     priority: 0.7,
   },
   ```

5. **Verify**: run `bun run build` and confirm `out/tools/<slug>/index.html` exists.

6. Tell the user to run `deploy.sh` when ready to publish.
