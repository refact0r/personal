<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import { page } from '$app/stores';
</script>

<main>
	{#if $page.error}
		<h1 class="errorCode">{$page.status}</h1>
		<h2 class="errorMessage">{$page.error.message.toLowerCase()}</h2>
	{/if}
</main>

<PageHead title={$page.status} description={$page.error.message} />

<style lang="scss">
	main {
		@include flex(column);

		height: 100%;
		max-height: calc(100vh - 6rem);
	}

	.errorCode {
		font-size: 5rem;
		margin: 0;
	}

	.errorMessage {
		margin: 0;
		color: var(--txt);
	}
</style>
