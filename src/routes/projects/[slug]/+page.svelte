<script>
	import { importImage } from '$lib/js/posts.js';

	export let data;

	let { default: content, metadata } = data.post;
</script>

<main>
	<h1>{metadata.name}</h1>
	{#await importImage(metadata.image) then src}
		<img {src} alt={metadata.name} />
	{/await}
	<div class="content">
		<svelte:component this={content} />
	</div>
</main>

<style>
	main {
		width: 100%;
		max-width: 100rem;
		padding: 0 5rem 5rem 5rem;
		margin: auto;
	}

	img {
		width: 100%;
	}
</style>
