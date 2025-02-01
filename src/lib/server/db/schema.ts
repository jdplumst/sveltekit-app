import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	hashedPassword: text('hashed_password').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	sessionToken: text('session_token').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expires: text('expires').notNull()
});

export const todo = sqliteTable('todo', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	status: text('status').notNull(),
	priority: text('priority').notNull()
});
