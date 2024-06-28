CREATE TABLE `Expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`budget_id` text NOT NULL,
	`category_id` text NOT NULL,
	`community_id` text NOT NULL,
	`amount` integer NOT NULL,
	`date` text NOT NULL,
	`deleted` integer,
	`description` text,
	`voucher` text
);
