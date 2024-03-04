<script>
	import { formatDate } from '$lib/js/utils.js';

	export let data;
</script>

<main>
	<h1>blog</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/blog/' + post.slug}>
				<div class="date">{formatDate(post.date)}</div>
				<h2>{post.name}</h2>
				<p>{post.description}</p>
			</a>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 65rem;
		margin: 0 auto 10rem auto;
	}

	.posts {
		@include flex(column, default, default);
		gap: 1.5rem;
		max-width: 100%;
	}

	h2 {
		font-weight: 400;
		margin: 0;
	}

	.date {
		font-size: 1.2rem;
		font-family: 'Space Mono', monospace;
		color: var(--txt-2);
		margin-top: 0.5rem;
	}

	a {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: left;
		gap: 0 2rem;
	}

	p {
		grid-column: 2;
		color: var(--txt-2);
	}
</style>
