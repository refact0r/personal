<script>
	import Image from '$lib/components/Image.svelte';

	export let data;
</script>

<main>
	<h1>projects</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/projects/' + post.slug}>
				<Image
					image={post.images[0]}
					alt={post.description}
					sizes="(min-width: 1200px) 50vw, 100vw"
					--aspect-ratio="16/9"
				/>
				<h2>{post.name}</h2>
				<p>{post.description}</p>
			</a>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		padding: 0 5rem;
	}

	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 3rem;
		max-width: 100%;
	}

	h2 {
		font-weight: 400;
		margin: 1.2rem 0 0.6rem 0;
	}

	p {
		color: var(--txt-2);
	}
</style>
