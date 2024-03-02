<script>
	import { importImage } from '$lib/js/posts.js';

	export let images;
</script>

<div class="container">
	{#each images as image}
		{#await importImage(image) then src}
			<img {src} />
		{/await}
	{/each}
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		gap: 1rem;

		img {
			width: 100%;
			height: auto;
		}
	}
</style>
