# Privacy checklist

Complete this checklist before changing the GitHub repository from Private to Public.

## Source content

- [ ] `worker/index.js` contains blank menus and task lists.
- [ ] There are no personal names or private owner labels.
- [ ] There are no real meals, ingredients or preparation instructions.
- [ ] There are no completion/checkmark records.
- [ ] There are no private shopping records.
- [ ] There are no personal dates or schedule anchors.

## Deployment information

- [ ] `.openai/hosting.json` is not present.
- [ ] `.openai/hosting.example.json` contains only `YOUR_SITE_PROJECT_ID`.
- [ ] `wrangler.toml` is not present.
- [ ] `wrangler.toml.example` contains only `YOUR_D1_DATABASE_ID`.
- [ ] No production URL is included.
- [ ] No API key, password, access token or database credential is included.

## Files and history

- [ ] The repository was created from this clean folder, not imported or forked from a private production repository.
- [ ] No `.git` folder was copied from another project.
- [ ] No `dist`, ZIP, TAR, backup or database-export file was uploaded.
- [ ] No screenshots show personal menu information.
- [ ] GitHub repository search returns no private names, foods, URLs or identifiers.

## Final confirmation

- [ ] A person cloning this repository receives only application features and empty tables.
- [ ] A clone cannot connect to the creator's production database.
- [ ] The repository was reviewed while Private before being made Public.
