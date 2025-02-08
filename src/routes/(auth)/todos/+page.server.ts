import { fail, redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { priorities, statuses, todos } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async ({ locals, params }) => {
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

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(303, '/');
		}

		const formSchema = z.object({
			title: z.string(),
			status: z.enum(['To Do', 'In Progress', 'Complete', 'Cancelled']),
			priority: z.enum(['Low', 'Medium', 'High'])
		});
		const formData = await request.formData();

		const input = formSchema.safeParse(Object.fromEntries(formData));
		if (input.error) {
			return fail(400, { error: 'Invalid form data.' });
		}

		const statusId = await db
			.select({ id: statuses.id })
			.from(statuses)
			.where(eq(statuses.name, input.data.status))
			.get();

		if (!statusId) {
			return fail(400, { error: 'Invalid status.' });
		}

		const priorityId = await db
			.select({ id: priorities.id })
			.from(priorities)
			.where(eq(priorities.name, input.data.priority))
			.get();

		if (!priorityId) {
			return fail(400, { error: 'Invalid priority.' });
		}

		await db.insert(todos).values({
			title: input.data.title,
			statusId: statusId.id,
			priorityId: priorityId.id,
			userId: locals.user.id
		});

		return { success: true };
	}
} satisfies Actions;
