<script lang="ts">
	import type { PageProps } from './$types';
	import type { Priority, Status } from '$lib/types';

	let { data }: PageProps = $props();

	function getStatusColor(status: Status): string {
		switch (status) {
			case 'Cancelled':
				return 'bg-gray-500';
			case 'To Do':
				return 'bg-blue-500';
			case 'In Progress':
				return 'bg-yellow-500';
			case 'Complete':
				return 'bg-green-500';
			default:
				return 'bg-gray-500';
		}
	}

	function getPriorityColor(priority: Priority): string {
		switch (priority) {
			case 'Low':
				return 'bg-green-200 text-green-800';
			case 'Medium':
				return 'bg-yellow-200 text-yellow-800';
			case 'High':
				return 'bg-red-200 text-red-800';
			default:
				return 'bg-gray-200 text-gray-800';
		}
	}
</script>

<main>
	<div class="container mx-auto flex flex-col items-center gap-5 px-4 py-8">
		<h1 class="mb-6 flex justify-center text-3xl font-bold">My Todos</h1>
		<div class="w-full rounded-lg bg-secondary p-6 shadow-md">
			{#if data.todos.length === 0}
				<p class="text-gray-500">No todos found. Start by adding a new todo!</p>
			{:else}
				<ul class="space-y-4">
					{#each data.todos as todo (todo.id)}
						<li
							class="flex items-center justify-between rounded-lg bg-muted-foreground p-4 text-black"
						>
							<div class="flex items-center space-x-4">
								<span class="font-medium">{todo.title}</span>
								<span
									class={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(todo.priority as Priority)}`}
								>
									{todo.priority}
								</span>
							</div>
							<span
								class={`rounded-full px-3 py-1 text-sm  ${getStatusColor(todo.status as Status)}`}
							>
								{todo.status}
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<p>{data.greeting.message}</p>
</main>
