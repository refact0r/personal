<script>
	import Image from '$lib/components/Image.svelte';

	export let data;
</script>

<main>
	<h1>projects</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/projects/' + post.slug} class="link">
				<Image
					image={post.thumbnail}
					alt={post.description}
					sizes="(min-width: 1200px) 50vw, 100vw"
					--aspect-ratio="16/9"
				/>
				<h2>{post.name}<span class="arrow">-></span></h2>
				<div class="description">{post.description}</div>
			</a>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		padding: 0 5rem 5rem 5rem;
	}

	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 3rem;
		max-width: 100%;
	}

	h2 {
		margin: 1rem 0 0.6rem 0;
		color: var(--txt);
		font-size: 1.6rem;
	}

	@media (max-width: 850px) {
		main {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
		.posts {
			grid-template-columns: auto;
		}
	}
</style>
