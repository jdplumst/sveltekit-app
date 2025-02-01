import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionToken = cookies.get('session');
	if (!sessionToken) return null;

	const session = await db
		.select()
		.from(sessions)
		.where(eq(sessions.sessionToken, sessionToken))
		.get();
	if (!session) return null;

	const expireDate = new Date(session.expires);
	if (expireDate < new Date()) return null;

	const user = await db
		.select({ id: users.id, username: users.username })
		.from(users)
		.where(eq(users.id, session.userId))
		.get();
	if (!user) return null;

	redirect(302, '/todos');
};
