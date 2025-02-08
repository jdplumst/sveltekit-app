<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageProps } from './$types';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';

	let { data, form }: PageProps = $props();

	let open = $state(false);

	const statuses = ['To Do', 'In Progress', 'Complete', 'Cancelled'] as const;
	type Status = (typeof statuses)[number];

	const priorities = ['Low', 'Medium', 'High'] as const;
	type Priority = (typeof priorities)[number];

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

	let title = $state('');
	let status = $state('');
	let priority = $state('');
</script>

<main>
	<div class="container mx-auto flex flex-col items-center gap-5 px-4 py-8">
		<h1 class="mb-6 flex justify-center text-3xl font-bold">My Todos</h1>
		<Button on:click={() => (open = true)}>Add Todo</Button>
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

	<Dialog.Root {open}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="pb-4 text-center">Add Todo</Dialog.Title>
				<Dialog.Description hidden={true}>A form to add a todo.</Dialog.Description>
			</Dialog.Header>
			<form method="POST" action="/todos" class="flex flex-col gap-4">
				<div class="forminput">
					<label for="title">Title</label>
					<Input
						type="text"
						placeholder="Title"
						name="title"
						bind:value={title}
						class={`${form?.error && 'border-red-500'}`}
					/>
				</div>
				<div class="forminput">
					<label for="status" class="w-full">Status</label>
					<Input type="hidden" name="status" bind:value={status} />
					<Select.Root>
						<Select.Trigger class={`${form?.error && 'border-red-500'}`}>
							<Select.Value placeholder="Status" />
						</Select.Trigger>
						<Select.Content>
							{#each statuses as s}
								<Select.Item value={s} on:click={() => (status = s)}>{s}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="forminput">
					<label for="priority" class="w-full">Priority</label>
					<Input type="hidden" name="priority" bind:value={priority} />
					<Select.Root>
						<Select.Trigger class={`${form?.error && 'border-red-500'}`}>
							<Select.Value placeholder="Priority" />
						</Select.Trigger>
						<Select.Content>
							{#each priorities as p}
								<Select.Item value={p} on:click={() => (priority = p)}>{p}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				{#if form?.error}
					<p class="text-red-500">{form?.error}</p>
				{/if}
				<Button type="submit">Submit</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</main>

<style>
	.forminput {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
