<script lang="ts">
	let { form } = $props();
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-orange-400 to-orange-600">
	<main class="container mx-auto flex flex-grow flex-col items-center justify-center px-4 py-16">
		<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
			<h1 class="mb-6 text-center text-3xl font-bold text-orange-500">Sign Up</h1>
			<form method="POST" action="?/signup" class="space-y-4 text-black">
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						maxlength="20"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                   focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
					/>
					{#if form?.username}<p class="text-red-500">{form?.error}</p>{/if}
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						maxlength="20"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                   focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
					/>
					{#if form?.password}<p class="text-red-500">{form?.error}</p>{/if}
				</div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
				>
					Sign Up
				</button>
			</form>
			<p class="mt-4 text-center text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="font-medium text-orange-500 hover:text-orange-600">Log in</a>
			</p>
		</div>
	</main>
</div>
