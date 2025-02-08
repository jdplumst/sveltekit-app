<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import { StatusValues, PriorityValues } from '$lib/types';

	let { form } = $props();

	let title = $state('');
	let status = $state('');
	let priority = $state('');
</script>

<main class="flex flex-col items-center gap-10 p-8">
	<h1 class="text-center text-3xl font-bold">Add Todo</h1>
	<form
		method="POST"
		action="/todos/add"
		class="flex w-full flex-col gap-4 bg-secondary p-6 md:w-1/2"
	>
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
					{#each StatusValues as s}
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
					{#each PriorityValues as p}
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
</main>

<style>
	label {
		font-weight: bold;
		font-size: 1.2rem;
	}

	.forminput {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
