# Meal Prep Companion

A privacy-friendly, mobile-first four-week meal-planning and preparation application. It supports editable menus, separate preparation tasks, configurable owners, Morning/Afternoon/Evening grouping, a weekly shopping list, shared daily completion state and installation as a Progressive Web App (PWA).

This public repository contains **application code and an empty database schema only**. It contains no creator menus, shopping records, preparation tasks, completion records, production URLs, deployment identifiers or database exports.

## Features

- Four rotating weeks
- Saturday-to-Friday menu view
- Breakfast, lunch and dinner planning
- Today dashboard with tomorrow preview
- Separate preparation tasks
- Morning, Afternoon and Evening sections
- Three configurable task owners
- Add, edit and remove tasks
- Editable shopping list with optional week labels
- Shared, date-separated task checkmarks
- Configurable Week 1 start date
- Installable mobile PWA
- Responsive desktop and mobile interface
- Persistent SQLite-compatible D1 storage

## Project structure

```text
.
├── README.md
├── UPLOAD_TO_GITHUB.md
├── PRIVACY_CHECKLIST.md
├── LICENSE
├── .gitignore
├── package.json
├── wrangler.toml.example
├── worker/
│   └── index.js
├── scripts/
│   ├── build.sh
│   └── validate-client.mjs
└── .openai/
    ├── hosting.example.json
    └── drizzle/
        ├── 0000_public_schema.sql
        └── meta/
            └── _journal.json
```

## Data model

The application uses two tables:

- `meal_prep_settings`: menus, preparation tasks, owners, settings and shopping items
- `task_checkmarks`: daily task completion state

The migration creates empty tables. It does not insert menu or personal data.

## Validate the project

Node.js 20 or later is required.

```bash
npm run validate
npm run build
```

The build output is written to `dist/`, which is intentionally excluded from Git.

## Cloudflare Worker setup

1. Create a Cloudflare D1 database.
2. Copy `wrangler.toml.example` to `wrangler.toml`.
3. Replace `YOUR_D1_DATABASE_ID` with the new database ID.
4. Apply `.openai/drizzle/0000_public_schema.sql` to the new database.
5. Deploy `worker/index.js` with the D1 binding named `DB`.

Every deployment must use its own database. Never reuse another person's database ID or production project configuration.

## ChatGPT Sites setup

1. Copy `.openai/hosting.example.json` to `.openai/hosting.json`.
2. Replace `YOUR_SITE_PROJECT_ID` with the project ID created for the new Site.
3. Keep `.openai/hosting.json` private; it is excluded by `.gitignore`.
4. Build and publish the project through Sites.

## First use

1. Open **Settings**.
2. Choose an application title.
3. Set the date on which Week 1 begins.
4. Enter the three owner labels.
5. Open **Edit** to add menus and preparation tasks.
6. Open **Shopping** to create the shopping list.

## Privacy

- Do not commit production hosting configuration.
- Do not commit database exports, backups or personal menu files.
- Do not place private data inside `worker/index.js`.
- Do not use real personal screenshots in a public repository.
- Review `PRIVACY_CHECKLIST.md` before making a repository public.

## License

MIT License. See `LICENSE`.
