<script>
	import { onMount } from 'svelte';

	const imports = import.meta.glob('/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		import: 'default',
		query: {
			enhanced: true,
			w: '2000;1200;800'
		}
	});
	const entries = Object.entries(imports);
	entries.reverse();

	let images = [];

	async function loadImages() {
		for (const [path, importFunc] of entries) {
			const src = await importFunc();
			images.push(src);
			images = images;
		}
	}

	onMount(() => {
		loadImages();
	});
</script>

<main>
	<h1>pics</h1>
	<p>just some random photos. taken on pixel 8, pixel 5a, pixel 2.</p>
	<br />
	{#each images as image}
		<picture>
			<source srcset={image.sources.avif} type="image/avif" />
			<source srcset={image.sources.webp} type="image/webp" />
			<img
				src={image.img.src}
				alt=""
				loading="lazy"
				onload="this.style.opacity=1"
				width={image.img.w}
				height={image.img.h}
			/>
		</picture>
	{/each}
</main>

<style>
	main {
		width: 100%;
		max-width: 63rem;
		margin: 0 auto 10rem auto;
		padding: 0 5rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	picture {
		display: block;
		margin-bottom: 1rem;
	}
	img {
		transition: opacity 0.2s;
		opacity: 0;
		width: 100%;
		height: auto;
	}

	@media (max-width: 850px) {
		main {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
	}
</style>
