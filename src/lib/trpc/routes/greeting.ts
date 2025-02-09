import { privateProcedure, publicProcedure, router } from '$lib/trpc/trpc';

export const greetingRouter = router({
	getGreeting: publicProcedure.query(async () => {
		return { message: `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}` };
	})
});
