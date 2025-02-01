CREATE TABLE `session` (
	`id` integer PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` integer NOT NULL,
	`expires` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`user_id` integer NOT NULL,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL
);
