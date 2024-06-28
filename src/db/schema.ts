import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Expenses = sqliteTable("Expenses", {
    id: text("id").primaryKey().notNull(),
    budget_id: text("budget_id").notNull(),
    category_id: text("category_id").notNull(),
    community_id: text("community_id").notNull(),
    amount: integer("amount").notNull(),
    date: text("date").notNull(),
    deleted: integer("deleted"),
    description: text("description"),
    voucher: text("voucher"),
    // timestamp is set on insert
    // timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});