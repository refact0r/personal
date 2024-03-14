<script>
	export let image,
		alt,
		sizes = '';

	async function importImage(image) {
		const pictures = import.meta.glob(
			'/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			{
				query: {
					enhanced: true,
					w: '3000;3600;3200;2800;2400;2000;1600;1200;800'
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
		<img {src} {alt} />
	</picture>
{/await}

<style>
	img {
		width: 100%;
		height: auto;
	}
</style>
