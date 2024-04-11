<script>
	import { fade } from 'svelte/transition';

	export let image,
		alt,
		sizes = '',
		loading = 'eager';

	async function importImage(image) {
		const blogPictures = import.meta.glob(
			`/src/content/blog/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
			{
				query: {
					enhanced: true,
					w: '2400;2000;1600;1200;800'
				}
			}
		);

		const projectPictures = import.meta.glob(
			`/src/content/projects/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
			{
				query: {
					enhanced: true,
					w: '2400;2000;1600;1200;800'
				}
			}
		);

		for (const [path, src] of Object.entries({ ...blogPictures, ...projectPictures })) {
			if (path.includes(image)) {
				const img = await src();
				return img.default;
			}
		}
	}
</script>

<picture>
	{#await importImage(image) then src}
		<source srcset={src.sources.avif} type="image/avif" {sizes} />
		<source srcset={src.sources.webp} type="image/webp" {sizes} />
		<img {src} {alt} {loading} onload="this.style.opacity=1" width={src.img.w} height={src.img.h} />
	{/await}
</picture>

<style lang="scss">
	picture {
		aspect-ratio: var(--aspect-ratio, auto);
	}

	img {
		width: var(--width, 100%);
		height: var(--height, auto);
		aspect-ratio: var(--aspect-ratio, auto);
		object-fit: cover;
		transition: opacity 0.2s;
		opacity: 0;
		margin: auto;
	}
</style>
