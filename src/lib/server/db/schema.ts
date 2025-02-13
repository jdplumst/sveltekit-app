import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	hashedPassword: text('hashed_password').notNull()
});

export const sessions = sqliteTable('session', {
	id: integer('id').primaryKey(),
	sessionToken: text('session_token').notNull().unique(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expires: text('expires').notNull()
});

export const todos = sqliteTable('todo', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	statusId: integer('status_id')
		.notNull()
		.references(() => statuses.id),
	priorityId: integer('priority_id')
		.notNull()
		.references(() => priorities.id)
});

export const statuses = sqliteTable('status', {
	id: integer('id').primaryKey(),
	name: text('status').notNull()
});

export const priorities = sqliteTable('priority', {
	id: integer('id').primaryKey(),
	name: text('priority').notNull()
});
