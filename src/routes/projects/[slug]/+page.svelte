<script>
	import { importImage } from '$lib/js/posts.js';
	import emblaCarouselSvelte from 'embla-carousel-svelte';

	export let data;

	let { default: content, metadata } = data.post;

	let options = { loop: true };
</script>

<main>
	<div class="head">
		<div class="row">
			<h1>{metadata.name}</h1>
			<a class="external" href={metadata.website} target="_blank">
				site<span class="arrow">/></span>
			</a>
			<a class="external" href={metadata.github} target="_blank">
				github<span class="arrow">/></span>
			</a>
		</div>
		<p class="description">
			{metadata.description}
		</p>
	</div>
	<div class="embla" use:emblaCarouselSvelte={{ options }}>
		<div class="embla__container">
			{#each metadata.images as image}
				<div class="embla__slide">
					{#await importImage(image) then src}
						<img {src} alt={metadata.name} />
					{/await}
				</div>
			{/each}
		</div>
	</div>
	<div class="content">
		<svelte:component this={content} />
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		padding: 0 0 10rem 0;
		margin: auto;
	}

	h1 {
		font-size: 2.6rem;
		margin: 0;
	}

	img {
		width: 100%;
		margin-bottom: 1rem;
	}

	.head {
		margin: 2rem 0 0 0;
		width: 100%;
		max-width: 50rem;
		margin: auto;

		a {
			font-family: 'Space Mono', monospace;
			font-size: 1.5rem;

			&:first-of-type {
				margin-left: auto;
			}
		}

		.row {
			@include flex(row, default, flex-end);
			gap: 2rem;
		}

		.description {
			font-size: 1.2rem;
			margin: 2rem 0 2rem 0;
			font-style: italic;
			color: var(--text-2);
		}
	}

	.content {
		width: 100%;
		max-width: 50rem;
		margin: auto;
	}

	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 80rem;
		min-width: 0;
		margin-left: 2rem;
		margin-right: 2rem;
	}
</style>
