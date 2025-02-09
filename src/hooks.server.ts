import { auth } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handleTRPC: Handle = createTRPCHandle({
	router: appRouter,
	createContext,
	onError: ({ type, path, error }) => {
		console.error(`Encountered error while trying to process ${type} @ ${path}:`, error);
	}
});

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
