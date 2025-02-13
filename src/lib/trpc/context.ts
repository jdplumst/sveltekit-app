import { db } from '$lib/server/db';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	const user = event.locals.user;
	return {
		user,
		db
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
