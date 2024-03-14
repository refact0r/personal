<script>
	import { fade } from 'svelte/transition';

	export let image,
		alt,
		sizes = '';

	async function importImage(image) {
		const pictures = import.meta.glob(
			'/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			{
				query: {
					enhanced: true,
					w: '2800;2400;2000;1600;1200;800'
				}
			}
		);

		for (const [path, src] of Object.entries(pictures)) {
			if (path.includes(image)) {
				const img = await src();
				return img.default;
			}
		}
	}
</script>

{#await importImage(image) then src}
	<picture>
		<source srcset={src.sources.avif} type="image/avif" {sizes} />
		<source srcset={src.sources.webp} type="image/webp" {sizes} />
		<img {src} {alt} onload="this.style.opacity=1" />
	</picture>
{/await}

<style lang="scss">
	img {
		width: var(--width, 100%);
		height: var(--height, auto);
		aspect-ratio: var(--aspect-ratio, 16/9);
		object-fit: cover;
		transition: opacity 0.2s;
		opacity: 0;
	}
</style>
