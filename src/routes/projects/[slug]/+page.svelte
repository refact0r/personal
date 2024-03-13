<script>
	import Image from '$lib/components/Image.svelte';
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
	{#if metadata.images.length > 1}
		<div class="embla" use:emblaCarouselSvelte={{ options }}>
			<div class="embla__container">
				{#each metadata.images as image}
					<div class="embla__slide">
						<Image {image} alt={metadata.description} />
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="single-image">
			<Image image={metadata.images[0]} alt={metadata.description} />
		</div>
	{/if}
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

	.single-image {
		width: 50%;
		margin: auto;
	}

	.head {
		margin: 2rem auto 3rem auto;
		width: 100%;
		max-width: 50rem;

		a {
			font-family: 'Space Mono', monospace;
			font-size: 1.5rem;

			&:first-of-type {
				margin-left: auto;
			}
		}

		.row {
			@include flex(row, default, center);
			gap: 2rem;
		}

		.description {
			font-size: 1.2rem;
			margin: 1.5rem 0 2rem 0;
			font-style: italic;
			color: var(--txt-2);
		}
	}

	.content {
		width: 100%;
		max-width: 50rem;
		margin: auto;
		margin-top: 3rem;
	}

	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 50%;
		min-width: 0;
		margin-left: 2rem;
		margin-right: 2rem;
	}
</style>
