import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		if (!username) {
			return fail(400, { error: 'Username is required.', username: true });
		}

		const password = data.get('password') as string;
		if (!password) {
			return fail(400, { error: 'Password is required.', password: true });
		}

		const user = await db.select().from(users).where(eq(users.username, username)).get();

		if (!user) {
			return fail(401, { error: 'Invalid username or password.' });
		}

		if (!bcrypt.compare(password, user.hashedPassword)) {
			return fail(401, { error: 'Invalid username or password.' });
		}

		const currentDate = new Date();
		currentDate.setMonth(currentDate.getMonth() + 1); // 1 month from now
		const expireDate = currentDate.toISOString();

		const session = await db
			.insert(sessions)
			.values({
				sessionToken: crypto.randomUUID(),
				userId: user.id,
				expires: expireDate
			})
			.returning();

		cookies.set('session', session[0].sessionToken, {
			path: '/',
			maxAge: new Date(expireDate).getTime(),
			httpOnly: true,
			secure: env.NODE_ENV === 'production'
		});

		redirect(303, '/todos');
	}
} satisfies Actions;
