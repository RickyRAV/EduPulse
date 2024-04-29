import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// ONLY FOR LOCAL DEVELOPMENT
dotenv.config({
    path: ".env.local"
});

// PRODUCTION ENV
// dotenv.config({
//     path: ".env.local.production"
// });

export default {
    schema: "./drizzle/schema.ts",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    }
} satisfies Config;