CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`price` real NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`created_at` integer
);
