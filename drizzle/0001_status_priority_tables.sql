CREATE TABLE `priority` (
	`id` integer PRIMARY KEY NOT NULL,
	`priority` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `status` (
	`id` integer PRIMARY KEY NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `todo` ADD `status_id` integer NOT NULL REFERENCES status(id);--> statement-breakpoint
ALTER TABLE `todo` ADD `priority_id` integer NOT NULL REFERENCES priority(id);--> statement-breakpoint
ALTER TABLE `todo` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `todo` DROP COLUMN `priority`;--> statement-breakpoint
CREATE UNIQUE INDEX `session_session_token_unique` ON `session` (`session_token`);