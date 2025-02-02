import { fail, redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';

export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		if (!username) {
			return fail(400, { error: 'Username is required.', username: true });
		}

		if (username.length < 3 || username.length > 20) {
			return fail(400, {
				error: 'Username must be between 3 and 20 characters.',
				username: true
			});
		}

		const password = data.get('password') as string;
		if (!password) {
			return fail(400, { error: 'Password is required.', password: true });
		}

		if (password.length < 3 || password.length > 20) {
			return fail(400, {
				error: 'Password must be between 3 and 20 characters.',
				password: true
			});
		}

		const usernameExists = await db.select().from(users).where(eq(users.username, username));
		if (usernameExists.length > 0) {
			return fail(409, { error: 'The username is already taken.', username: true });
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

		const currentDate = new Date();
		currentDate.setMonth(currentDate.getMonth() + 1); // 1 month from now
		const expireDate = currentDate.toISOString();

		const session = await db
			.insert(sessions)
			.values({
				sessionToken: crypto.randomUUID(),
				userId: user[0].id,
				expires: expireDate
			})
			.returning();

		cookies.set('session', session[0].sessionToken, {
			path: '/',
			maxAge: new Date(expireDate).getTime(),
			httpOnly: true,
			secure: env.NODE_ENV === 'production'
		});

		redirect(302, '/todos');
	}
} satisfies Actions;
