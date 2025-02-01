import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';
import type { Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function auth(cookies: Cookies) {
	const sessionId = cookies.get('session');
	if (!sessionId) return null;
	const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
	if (!session) return null;
	const user = await db
		.select({ id: users.id, username: users.username })
		.from(users)
		.where(eq(users.id, session.userId))
		.get();
	if (!user) return null;
	return user;
}
