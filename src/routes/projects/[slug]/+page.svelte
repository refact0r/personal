<script>
	import { importImage } from '$lib/js/posts.js';

	export let data;

	let { default: content, metadata } = data.post;
</script>

<main>
	<div class="head">
		<h1>{metadata.name}</h1>
		<a class="external" href={metadata.website} target="_blank">
			site<span class="arrow">/></span>
		</a>
		<a class="external" href={metadata.github} target="_blank">
			github<span class="arrow">/></span>
		</a>
	</div>
	<p class="description">
		{metadata.description}
	</p>
	<div class="carousel">
		{#each metadata.images as image}
			{#await importImage(image) then src}
				<img {src} alt={metadata.name} />
			{/await}
		{/each}
	</div>
	<div class="content">
		<svelte:component this={content} />
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 100rem;
		padding: 0 5rem 10rem 5rem;
		margin: auto;
	}

	h1 {
		font-size: 2.6rem;
		margin: 0;
	}

	img {
		width: 100%;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.2rem;
		margin: 2rem 0 2rem 0;
		font-style: italic;
		color: var(--text-2);
	}

	.head {
		@include flex(row, default, flex-end);
		gap: 2rem;
		margin: 2rem 0 0 0;

		a {
			font-family: 'Space Mono', monospace;
			font-size: 1.5rem;

			&:first-of-type {
				margin-left: auto;
			}
		}
	}

	.content {
		max-width: 55rem;
		margin: auto;
	}
</style>
