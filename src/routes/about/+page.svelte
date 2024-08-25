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
		hey there! i'm a student in seattle who goes by the name refact0r online. i'm interested in comp
		sci, web dev, design, among other topics. i'm passionate about building websites and apps that
		are both functional and beautiful.
	</p>
	<h2>links</h2>
	<a href="https://github.com/refact0r" class="external">github<span class="arrow">/></span> </a>
	<a href="https://discord.com/users/508863359777505290" class="external"
		>discord<span class="arrow">/></span>
	</a>
	<!-- <div class="row">
		<div class="col"></div>
		<div class="col"></div>
	</div> -->
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
	<h2>this site</h2>
	<a href="https://github.com/refact0r/personal" class="external"
		>github repo<span class="arrow">/></span></a
	>
	<a href="https://us.umami.is/share/HwZnyuHQ5Rqz3NWf/refact0r.dev" class="external"
		>analytics<span class="arrow">/></span></a
	>
	<div class="info">
		stack <span class="sub">-></span> sveltekit <span class="sub">/</span> mdsvex
		<span class="sub">/</span> vite <span class="sub">/</span> vercel
	</div>
	<div class="info">
		fonts <span class="sub">-></span> space mono <span class="sub">/</span>
		<span style="font-family: 'Space Grotesk Variable'">space grotesk</span>
	</div>
	<div class="info">
		<div class="colors">
			<div class="color" style="background: var(--bg); border: 2px solid var(--bg-2);">bg</div>
			<div class="color" style="background: var(--bg-2);">bg-2</div>
			<div class="color" style="background: var(--bg-3);">bg-3</div>
			<div class="color" style="background: var(--txt-3); color: var(--bg);">txt-3</div>
			<div class="color" style="background: var(--txt-2); color: var(--bg);">txt-2</div>
			<div class="color" style="background: var(--txt); color: var(--bg);">txt</div>
			<div class="color" style="background: var(--txt-0); color: var(--bg);">txt-0</div>
			<div class="color" style="background: var(--pink); color: var(--bg);">pink</div>
			<div class="color" style="background: var(--purple); color: var(--bg);">purple</div>
			<div class="color" style="background: var(--blue); color: var(--bg);">blue</div>
		</div>
	</div>
	<h2>webring</h2>
	<div class="info">
		<a class="webring previous" href="https://ctp-webr.ing/refact0r/previous">
			<span> &lt;- </span>&nbsp;
		</a><a class="webring home" href="https://ctp-webr.ing/">catppuccin webring</a><a
			class="webring next"
			href="https://ctp-webr.ing/refact0r/next"
		>
			&nbsp;<span> -> </span>
		</a>
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		max-width: 53rem;
		margin: 0 auto 10rem auto;
		padding: 1.5rem;
	}

	a {
		font-family: 'Space Mono', monospace;
		font-size: 1.2rem;
		margin: 0.5rem 0;
		display: block;
	}

	.info {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		font-family: 'Space Mono', monospace;
	}

	.webring {
		display: inline-block;
		margin: 0;
		span {
			display: inline-block;
			transition: 0.2s;
		}
		&.home:hover {
			text-decoration: underline;
		}
		&.next:hover span {
			transform: translateX(0.3em);
		}
		&.previous:hover span {
			transform: translateX(-0.3em);
		}
	}

	.colors {
		display: inline-flex;
		margin-top: 0.4rem;
		flex-wrap: wrap;
	}

	.color {
		display: inline-block;
		padding: 0 0.4rem;
		width: 5rem;
		text-align: center;
		font-size: 0.9em;
	}

	h1 {
		margin-bottom: 2rem;
	}
</style>
