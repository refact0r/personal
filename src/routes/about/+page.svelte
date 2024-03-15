<script>
	let content = {
		languages: {
			web: ['js', 'ts', 'html', 'css', 'scss'],
			other: ['python', 'dart', 'java']
		},
		tech: {
			frameworks: ['sveltekit', 'flutter', 'quart'],
			databases: ['mongo', 'sqlite', 'isar'],
			cms: ['sanity', 'decap'],
			tools: ['vscode', 'figma', 'inkscape']
		}
	};
</script>

<main>
	<h1>about</h1>
	<p>
		hey there! i'm a student in seattle, wa who goes by the name refact0r online. i'm interested in
		comp sci, web dev, design, among other topics. i'm passionate about building websites and apps
		that are both functional and beautiful.
	</p>
	<br />
	<div class="row">
		<div class="col">
			<h2>contact</h2>
			<div class="info">discord <span class="sub">-></span> @refact0r</div>
			<div class="info">
				email <span class="sub">-></span>
				<a href="https://github.com/refact0r" class="external"
					>refact0r.contact@gmail.com<span class="arrow">/></span>
				</a>
			</div>
		</div>
		<div class="col">
			<h2>links</h2>
			<a href="https://github.com/refact0r" class="external"
				>github profile<span class="arrow">/></span>
			</a>
		</div>
	</div>
	<br />
	<h2>languages</h2>
	{#each Object.keys(content.languages) as category}
		<div class="info">
			{category} <span class="sub">-></span>
			{#each content.languages[category] as item}
				{item}
				{#if item !== content.languages[category][content.languages[category].length - 1]}
					<span class="sub">/</span>&nbsp;
				{/if}
			{/each}
		</div>
	{/each}
	<br />
	<h2>tech</h2>
	{#each Object.keys(content.tech) as category}
		<div class="info">
			{category} <span class="sub">-></span>
			{#each content.tech[category] as item}
				{item}
				{#if item !== content.tech[category][content.tech[category].length - 1]}
					<span class="sub">/</span>&nbsp;
				{/if}
			{/each}
		</div>
	{/each}
	<br />
	<h2>this site</h2>
	<a href="https://github.com/refact0r/personal" class="external"
		>github repo<span class="arrow">/></span></a
	>
	<div class="info">
		stack <span class="sub">-></span> sveltekit <span class="sub">/</span> mdsvex
		<span class="sub">/</span> vite
	</div>
	<div class="info">host <span class="sub">-></span> vercel</div>
	<div class="info">
		fonts <span class="sub">-></span> space mono <span class="sub">/</span>
		<span style="font-family: 'Space Grotesk'">space grotesk</span>
	</div>
	<div class="info">
		<div class="colors">
			<div class="color" style="background: var(--bg); border: 2px solid var(--bg-2);">bg</div>
			<div class="color" style="background: var(--bg-2);">bg-2</div>
			<div class="color" style="background: var(--txt-2); color: var(--bg);">txt-2</div>
			<div class="color" style="background: var(--txt); color: var(--bg);">txt</div>
			<div class="color" style="background: var(--pink); color: var(--bg);">pink</div>
			<div class="color" style="background: var(--purple); color: var(--bg);">purple</div>
			<div class="color" style="background: var(--blue); color: var(--bg);">blue</div>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 50rem;
		margin: 0 auto 10rem auto;
	}

	h1 {
		margin-bottom: 2rem;
	}

	p {
		font-size: 1.1rem;
		line-height: 1.75;
	}

	a {
		font-family: 'Space Mono', monospace;
		font-size: 1.2rem;
	}

	.row {
		@include flex(row, space-between, default);
		gap: 2.5rem;
		margin: 2rem 0;
		h2 {
			margin-top: 0;
		}
		.info:last-child {
			margin-bottom: 0;
		}
	}

	.info {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		font-family: 'Space Mono', monospace;
	}

	.colors {
		display: inline-flex;
		margin-top: 0.2rem;
	}

	.color {
		display: inline-block;
		padding: 0 0.4rem;
		width: 6rem;
		text-align: center;
	}

	.sub {
		color: var(--txt-2);
	}
</style>
