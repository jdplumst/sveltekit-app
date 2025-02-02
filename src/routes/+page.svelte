<script lang="ts">
	let { data } = $props();
</script>

<div class="bg-gradient-to-br from-orange-400 to-orange-600">
	<main class="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
		<h1 class="mb-4 text-center text-5xl font-bold">Todo App</h1>
		<p class="mb-8 max-w-2xl text-center text-xl">
			Simplify your life and boost productivity with our easy-to-use task management solution.
		</p>
		<a
			href="/signup"
			class="transform rounded-lg bg-blue-500 px-6 py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
		>
			Get Started
		</a>
	</main>
</div>
