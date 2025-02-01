import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = await auth(cookies);
	if (session) {
		redirect(302, '/todos');
	}

	return {
		message: 'Hello World!'
	};
};
