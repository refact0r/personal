<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import { formatDate } from '$lib/js/utils.js';

	export let data;
</script>

<PageHead title="blog" description="posts about various topics." />

<main>
	<h1>blog</h1>

	<div class="posts">
		{#each data.posts as post}
			<a href={'/blog/' + post.slug} class="link">
				<div class="date">{formatDate(post.date)}</div>
				<h2><iconify-icon icon={post.icon} />{post.name}<span class="arrow">-></span></h2>
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
		font-size: 1.6rem;
		margin: 0;
		color: var(--txt);
	}

	.date {
		font-size: 1.2rem;
		font-family: 'Space Mono', monospace;
		color: var(--txt-2);
		margin-top: 0.3rem;
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
