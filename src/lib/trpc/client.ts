import type { AppRouter } from '$lib/trpc/router';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import transformer from 'trpc-transformer';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = createTRPCClient<AppRouter>({ init, transformer });
	if (isBrowser) browserClient = client;
	return client;
}
