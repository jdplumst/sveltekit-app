import { auth } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await auth(event);

	if (event.route.id?.startsWith('/(auth)')) {
		if (!event.locals.user) {
			redirect(303, '/');
		}
	} else {
		if (event.locals.user) {
			redirect(303, '/todos');
		}
	}

	const response = await resolve(event);
	return response;
};
