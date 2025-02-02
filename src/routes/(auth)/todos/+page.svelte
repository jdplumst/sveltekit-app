<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	type Status = 'To Do' | 'In Progress' | 'Complete' | 'Cancelled';
	type Priority = 'Low' | 'Medium' | 'High';

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

<div class="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
	<div class="container mx-auto px-4 py-8">
		<h1 class="mb-6 flex justify-center text-3xl font-bold text-white">My Todos</h1>
		<div class="rounded-lg bg-white p-6 shadow-md">
			{#if data.todos.length === 0}
				<p class="text-gray-500">No todos found. Start by adding a new todo!</p>
			{:else}
				<ul class="space-y-4">
					{#each data.todos as todo (todo.id)}
						<li class="flex items-center justify-between rounded-lg bg-gray-100 p-4">
							<div class="flex items-center space-x-4">
								<span class="font-medium">{todo.title}</span>
								<span
									class={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(todo.priority as Priority)}`}
								>
									{todo.priority}
								</span>
							</div>
							<span
								class={`rounded-full px-3 py-1 text-sm text-white ${getStatusColor(todo.status as Status)}`}
							>
								{todo.status}
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
