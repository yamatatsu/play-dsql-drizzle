import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./db/schema";

const db = drizzle({
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		ssl: true,
	},
});

main().then(
	() => {
		console.info("Done");
		process.exit(0);
	},
	(err) => {
		console.error(err);
		process.exit(1);
	},
);

async function main() {
	const users = [
		{
			id: "979d1120-db93-4c5e-b631-36f00fd46607",
			name: "John Doe",
			age: 30,
			email: "foo@example.com",
		},
		{
			id: "b35efca4-e902-4531-aad2-97d86e553582",
			name: "Jane Doe",
			age: 25,
			email: "bar@example.com",
		},
		{
			id: "b10c2fd5-be46-4b15-bd50-2043dcd394b3",
			name: "Alice",
			age: 20,
			email: "buz@example.com",
		},
	] satisfies (typeof usersTable.$inferInsert)[];

	for (const user of users) {
		console.time("Inserting a user");
		await db.insert(usersTable).values(user).onConflictDoUpdate({
			target: usersTable.id,
			set: user,
		});
		console.timeEnd("Inserting a user");
	}

	console.time("Selecting all users");
	const selected = await db.select().from(usersTable);
	console.timeEnd("Selecting all users");

	console.log("Users:", selected);
}
