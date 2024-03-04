<script>
	import { importImage } from '$lib/js/posts.js';

	export let data;
</script>

<main>
	<h1>projects</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/projects/' + post.slug}>
				{#await importImage(post.images[0]) then src}
					<img {src} alt={post.name} />
				{/await}
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

	img {
		width: 100%;
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
