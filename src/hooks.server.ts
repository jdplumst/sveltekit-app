import { auth } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handleTRPC: Handle = createTRPCHandle({ router, createContext });

export const handleOthers: Handle = async ({ event, resolve }) => {
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

export const handle = sequence(handleTRPC, handleOthers);
