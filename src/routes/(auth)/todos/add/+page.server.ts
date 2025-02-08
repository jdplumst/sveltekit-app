import { db } from '$lib/server/db';
import { priorities, statuses, todos } from '$lib/server/db/schema';
import { PriorityValues, StatusValues } from '$lib/types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(303, '/');
		}

		const formSchema = z.object({
			title: z.string(),
			status: z.enum(StatusValues),
			priority: z.enum(PriorityValues)
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
