<script>
	export let data;

	async function importImage(image) {
		const pictures = import.meta.glob(
			'/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			{
				query: {
					enhanced: true
				}
			}
		);

		for (const [path, src] of Object.entries(pictures)) {
			if (path.includes(image)) {
				const img = await src();
				return img.default.img.src;
			}
		}
	}
</script>

<main>
	<h1>projects</h1>

	<div class="grid">
		{#each data.posts as post}
			<a href={'/projects/' + post.slug}>
				{#await importImage(post.image) then src}
					<img {src} alt={post.name} />
				{/await}
				<h2>{post.name}</h2>
				<p>{post.description}</p>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		padding: 0 5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 3rem;
		max-width: 100%;
	}

	img {
		width: 100%;
		max-width: 50rem;
	}

	a {
		max-width: 50rem;
	}
</style>
