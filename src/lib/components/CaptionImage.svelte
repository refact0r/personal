<script>
	import Image from './Image.svelte';

	export let image,
		alt = '',
		source = '',
		sizes = '';
</script>

<figure>
	<Image {image} {alt} {sizes} />
	{#if alt !== ''}
		<figcaption>{alt} <a href={source}>source</a></figcaption>
	{/if}
</figure>

<style>
	figcaption {
		font-size: 1rem;
		text-align: center;
		margin-top: 1.5rem;
	}
</style>
