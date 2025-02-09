import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { priorities, statuses, todos } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) {
		redirect(303, '/');
	}

	const todosData = await db
		.select({ id: todos.id, title: todos.title, status: statuses.name, priority: priorities.name })
		.from(todos)
		.innerJoin(statuses, eq(todos.statusId, statuses.id))
		.innerJoin(priorities, eq(todos.priorityId, priorities.id))
		.where(eq(todos.userId, user.id))
		.orderBy(desc(statuses.id), desc(priorities.id));

	return { todos: todosData };
};
