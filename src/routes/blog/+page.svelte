<script>
	import { importImage } from '$lib/js/posts.js';

	export let data;
</script>

<main>
	<h1>blog</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/blog/' + post.slug}>
				<h2>{post.name}</h2>
				<p>{post.description}</p>
			</a>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 55rem;
		padding: 0 5rem;
		margin: auto;
	}

	.posts {
		@include flex(column, default, default);
		gap: 1rem;
		max-width: 100%;
	}
</style>
