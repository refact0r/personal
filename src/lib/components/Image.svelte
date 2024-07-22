<script>
	export let image,
		alt,
		sizes = '',
		loading = 'eager';

	async function importImage(image) {
		const pictures = import.meta.glob(`/src/content/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`, {
			import: 'default',
			query: {
				enhanced: true,
				w: '2400;2000;1600;1200;800;400'
			}
		});

		for (const [path, src] of Object.entries(pictures)) {
			if (path.includes(image)) {
				return await src();
			}
		}
	}
</script>

<picture>
	{#await importImage(image) then src}
		<source srcset={src.sources.avif} type="image/avif" {sizes} />
		<source srcset={src.sources.webp} type="image/webp" {sizes} />
		<img
			src={src.img.src}
			{alt}
			{loading}
			onload="this.style.opacity=1"
			width={src.img.w}
			height={src.img.h}
		/>
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
