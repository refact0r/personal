<script>
	import Image from './Image.svelte';

	export let image,
		alt = '',
		sizes = '';
</script>

<figure>
	<Image {image} {alt} {sizes} />
	{#if alt !== ''}
		<figcaption>{alt}</figcaption>
	{/if}
</figure>

<style>
	figcaption {
		font-size: 1rem;
		text-align: center;
		margin-top: 1.5rem;
	}
</style>
