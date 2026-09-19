# Upload to GitHub — beginner instructions

These steps use the GitHub website. No Terminal or Git commands are required.

## Before you begin

Use only this sanitized folder. Do not upload files from a personal or production Meal Prep application.

## Create the repository

1. Sign in at `https://github.com`.
2. Click the **+** button in the upper-right corner.
3. Select **New repository**.
4. Use these values:

   - **Repository name:** `meal-prep-companion`
   - **Description:** `A mobile-first four-week meal-planning PWA with preparation tasks, configurable ownership, shopping lists and shared completion tracking.`
   - **Visibility:** `Private` initially
   - **Add a README:** leave unchecked
   - **Add .gitignore:** select None
   - **Choose a license:** select None

5. Click **Create repository**.

## Upload this project

1. On the empty repository page, click **uploading an existing file**.
2. If that link is not visible, select **Add file → Upload files**.
3. Open this project folder in Finder.
4. On macOS, press **Command + Shift + .** to reveal hidden files.
5. Select all files and folders inside the project folder, including `.gitignore` and `.openai`.
6. Drag the selection onto the GitHub upload page.
7. Confirm that GitHub shows all of these top-level items:

   - `.openai`
   - `.gitignore`
   - `worker`
   - `scripts`
   - `README.md`
   - `UPLOAD_TO_GITHUB.md`
   - `PRIVACY_CHECKLIST.md`
   - `LICENSE`
   - `package.json`
   - `wrangler.toml.example`

8. Enter the commit message: `Initial public version of Meal Prep Companion`.
9. Choose **Commit directly to the main branch**.
10. Click **Commit changes**.

## Add repository details

Open the repository's **About** settings and enter:

- **Description:** `A privacy-friendly, mobile-first meal-planning PWA with a four-week schedule, task ownership, shopping lists and shared completion tracking.`
- **Website:** leave blank unless you later create a public demo using only fictional data
- **Topics:** `meal-planner`, `meal-prep`, `pwa`, `javascript`, `mobile-first`, `cloudflare-workers`, `sqlite`, `d1`, `task-manager`, `shopping-list`

## Review before publishing

While the repository is still private:

1. Open `worker/index.js` and confirm it contains only blank data.
2. Search the repository for personal names, private meals, production URLs and project IDs.
3. Open `.openai/hosting.example.json` and confirm it contains `YOUR_SITE_PROJECT_ID`, not a real ID.
4. Complete every item in `PRIVACY_CHECKLIST.md`.

If personal data was accidentally uploaded, do not merely delete the file. Keep the repository private, delete the entire repository and create a new clean repository from this sanitized folder.

## Make the repository public

1. Open the repository's **Settings**.
2. Scroll to **Danger Zone**.
3. Find **Change repository visibility**.
4. Select **Make public**.
5. Follow GitHub's confirmation instructions.

## Make it a template

1. Open **Settings**.
2. In the repository's general settings, select **Template repository**.
3. Return to the repository homepage and confirm that **Use this template** appears.

People can now create their own repository containing the features and empty schema, without receiving anyone else's meal data.
