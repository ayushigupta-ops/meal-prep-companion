CREATE TABLE `meal_prep_settings` (
  `id` integer PRIMARY KEY NOT NULL,
  `data` text NOT NULL,
  `updated_at` text NOT NULL
);

CREATE TABLE `task_checkmarks` (
  `task_date` text NOT NULL,
  `task_key` text NOT NULL,
  `completed` integer NOT NULL DEFAULT 1,
  `updated_at` text NOT NULL,
  PRIMARY KEY (`task_date`, `task_key`)
);
