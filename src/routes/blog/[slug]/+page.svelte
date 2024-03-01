<script>
	import { formatDate } from '$lib/js/utils.js';

	export let data;

	let { default: content, metadata } = data.post;
</script>

<main>
	<h1>{metadata.name}</h1>
	<p class="date">{formatDate(metadata.date)}</p>
	<p class="description">{metadata.description}</p>
	<div class="content">
		<svelte:component this={content} />
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 60rem;
		padding: 0 5rem 10rem 5rem;
		margin: auto;
	}

	.date {
		margin: 1rem 0;
		font-size: 1.4rem;
		font-family: 'Space Mono', monospace;
		color: var(--text-2);
	}

	.description {
		font-size: 1.2rem;
		margin: 1rem 0 2rem 0;
		font-style: italic;
		color: var(--text-2);
	}

	h1 {
		font-size: 2.6rem;
		margin: 2rem 0;
	}
</style>
