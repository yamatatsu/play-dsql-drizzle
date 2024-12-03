import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: cuz it is not production code
		host: process.env.DB_HOST!,
		// biome-ignore lint/style/noNonNullAssertion: cuz it is not production code
		database: process.env.DB_NAME!,
		// biome-ignore lint/style/noNonNullAssertion: cuz it is not production code
		user: process.env.DB_USER!,
		// biome-ignore lint/style/noNonNullAssertion: cuz it is not production code
		password: process.env.DB_PASSWORD!,
		ssl: true,
	},
});
