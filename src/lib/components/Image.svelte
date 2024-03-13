<script>
	export let image, alt;

	async function importImage(image) {
		const pictures = import.meta.glob(
			'/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			{
				query: {
					enhanced: true,
					w: '2000,1000'
				}
			}
		);

		for (const [path, src] of Object.entries(pictures)) {
			if (path.includes(image)) {
				const img = await src();
				console.log(img);
				return img.default;
			}
		}
	}
</script>

{#await importImage(image) then src}
	<picture>
		<source srcset={src.sources.avif} type="image/avif" />
		<source srcset={src.sources.png} type="image/png" />
		<img {src} {alt} />
	</picture>
{/await}

<style>
	img {
		width: 100%;
		height: auto;
	}
</style>
