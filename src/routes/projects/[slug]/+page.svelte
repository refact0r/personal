<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import Image from '$lib/components/Image.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';

	export let data;

	let { default: content, metadata } = data.post;

	let emblaApi;
	let options = { loop: true };

	function emblaInit(event) {
		emblaApi = event.detail;
		console.log(emblaApi.slideNodes());
	}

	function emblaNext() {
		emblaApi.scrollNext();
	}

	function emblaPrev() {
		emblaApi.scrollPrev();
	}
</script>

<PageHead title={metadata.name} description={metadata.description} />

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
		<div class="embla" use:emblaCarouselSvelte={{ options }} on:emblaInit={emblaInit}>
			<div class="embla__container">
				{#each metadata.images as image}
					<div class="embla__slide">
						<Image {image} alt={metadata.description} sizes="100vw" />
					</div>
				{/each}
			</div>
			<button class="embla__prev" on:click={emblaPrev}>&lt;-</button>
			<button class="embla__next" on:click={emblaNext}>-></button>
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
		font-size: 2.5rem;
		margin: 0;
	}

	.single-image {
		width: 70%;
		max-width: 80rem;
		margin: auto;
	}

	.head {
		margin: 1rem auto 3rem auto;
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
		position: relative;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 70%;
		max-width: 80rem;
		min-width: 0;
		margin-left: 1.5rem;
		margin-right: 1.5rem;
	}
	.embla__prev,
	.embla__next {
		position: absolute;
		top: 0;
		bottom: 0;
		width: calc(15% - 3rem);
		background: none;
		opacity: 0;
		color: gray;
		font-size: 3rem;
		font-family: 'Space Mono', monospace;
		mix-blend-mode: difference;
		transition: 0.2s;

		&:hover {
			opacity: 1;
		}
	}
	.embla__next {
		right: 0;
	}
	.embla__prev {
		left: 0;
	}
</style>
