<script>
	import { onMount } from 'svelte';

	export let data;
	let { images } = data;

	let columns = [];
	let columnCount = 3;
	let containerWidth;

	$: if (images && images.length > 0 && containerWidth) {
		columnCount = calculateColumnCount(containerWidth);
		columns = distributeImages(images, columnCount, containerWidth);
	}

	function calculateColumnCount(width) {
		if (width < 800) return 1;
		if (width < 1200) return 2;
		return 3;
	}

	function distributeImages(images, columnCount, containerWidth) {
		const columns = Array.from({ length: columnCount }, () => []);
		const columnHeights = new Array(columnCount).fill(0);

		const scaleFactor = containerWidth / columnCount / 100;

		images.forEach((image) => {
			const scaledHeight = (image.img.h / image.img.w) * scaleFactor;
			const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

			columns[shortestColumnIndex].push(image);
			columnHeights[shortestColumnIndex] += scaledHeight;
		});

		return columns;
	}

	let container;

	onMount(() => {
		if (container) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					containerWidth = entry.contentRect.width;
				}
			});

			resizeObserver.observe(container);

			return () => {
				resizeObserver.disconnect();
			};
		}
	});

	function handleResize() {
		if (container) {
			containerWidth = container.offsetWidth;
		}
	}
</script>

<svelte:window on:resize={handleResize} />

<main bind:this={container} use:handleResize>
	<h1>board</h1>
	<p>some photos. taken on pixel 8, pixel 5a, and pixel 2.</p>
	<br />
	<div class="grid" style="--column-count: {columnCount}">
		{#each columns as column, i}
			<div class="column">
				{#each column as image}
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
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		width: 100%;
		max-width: 100rem;
		margin: 0 auto 10rem auto;
		padding: 0 5rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--column-count, 3), 1fr);
		gap: 1rem;
	}
	.column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	picture {
		display: block;
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
