import { greetingRouter } from '$lib/trpc/routes/greeting';
import { router, t } from '$lib/trpc/trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const appRouter = router({
	greeting: greetingRouter
});

export const createCaller = t.createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
