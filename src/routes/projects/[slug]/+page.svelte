<script>
	import { importImage } from '$lib/js/posts.js';

	export let data;

	let { default: content, metadata } = data.post;
</script>

<main>
	<div class="head">
		<h1>{metadata.name}</h1>
		<a href={metadata.website} target="_blank">site<span class="link-arrow">/></span></a>
		<a href={metadata.github} target="_blank">github<span class="link-arrow">/></span></a>
	</div>
	{#await importImage(metadata.image) then src}
		<img {src} alt={metadata.name} />
	{/await}
	<div class="content">
		<svelte:component this={content} />
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 100rem;
		padding: 0 5rem 5rem 5rem;
		margin: auto;
	}

	img {
		width: 100%;
		margin-bottom: 1rem;
	}

	.head {
		@include flex(row, default, center);
		gap: 2rem;

		a {
			font-family: 'Space Mono';
			font-size: 1.5rem;

			&:first-of-type {
				margin-left: auto;
			}
		}
	}
</style>
