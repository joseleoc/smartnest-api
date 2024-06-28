import { DrizzleDB } from "middlewares/drizzle";

export type Context = {
    Bindings: {
        DB: D1Database;
    };
    Variables: {
        db: DrizzleDB;
    };
};