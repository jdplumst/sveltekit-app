import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function auth(event: RequestEvent) {
	const { cookies } = event;

	const sessionToken = cookies.get('session');
	if (!sessionToken) return null;

	const session = await db
		.select()
		.from(sessions)
		.where(eq(sessions.sessionToken, sessionToken))
		.get();
	if (!session) return null;

	const expireDate = new Date(session.expires);
	if (expireDate < new Date()) {
		cookies.delete('session', { path: '/' });
		await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
		return null;
	}

	const user = await db
		.select({ id: users.id, username: users.username })
		.from(users)
		.where(eq(users.id, session.userId))
		.get();
	if (!user) return null;

	return user;
}
