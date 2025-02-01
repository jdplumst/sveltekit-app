import { auth } from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = await auth(cookies);
	if (session) {
		redirect(302, '/todos');
	}

	return {
		message: 'Hello World!'
	};
};

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		console.log(data);

		const username = data.get('username') as string;
		if (!username) {
			return fail(400, { error: 'Username is required.', usernameMissing: true });
		}

		if (username.length < 3 || username.length > 20) {
			return fail(400, {
				error: 'Username must be between 3 and 20 characters.',
				usernameLength: true
			});
		}

		const password = data.get('password') as string;
		if (!password) {
			return fail(400, { error: 'Password is required.', passwordMissing: true });
		}

		if (password.length < 3 || password.length > 20) {
			return fail(400, {
				error: 'Password must be between 3 and 20 characters.',
				passwordLength: true
			});
		}

		const usernameExists = await db.select().from(users).where(eq(users.username, username));
		if (usernameExists.length > 0) {
			return fail(409, { error: 'Username already exists.', usernameExists: true });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await db
			.insert(users)
			.values({
				username,
				hashedPassword
			})
			.returning();

		await db.insert(sessions).values({
			sessionToken: crypto.randomUUID(),
			userId: user[0].id,
			expires: new Date().toISOString()
		});

		redirect(302, '/todos');
	}
} satisfies Actions;
