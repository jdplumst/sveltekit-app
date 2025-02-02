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

	const currentDate = new Date();
	currentDate.setMonth(currentDate.getMonth() + 1); // 1 month from now
	const newExpireDate = currentDate.toISOString();

	await db
		.update(sessions)
		.set({ expires: newExpireDate })
		.where(eq(sessions.sessionToken, sessionToken));

	return user;
}
