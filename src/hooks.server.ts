import { auth } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const user = await auth(event);

	if (event.route.id?.startsWith('/(auth)')) {
		if (!user) {
			redirect(302, '/');
		}
	} else {
		if (user) {
			redirect(302, '/todos');
		}
	}

	const response = await resolve(event);
	return response;
};
