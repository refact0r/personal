<script>
	import '../app.scss';
	import '@fontsource/space-mono';
	import '@fontsource-variable/space-grotesk';
	import { page } from '$app/stores';
	import pfp from '$lib/assets/pfp.svg';
	import { fly } from 'svelte/transition';

	export let data;
</script>

<header class:home={$page.url.pathname === '/'}>
	<div class="row">
		<a class="pfplink" href="/"><img class="pfp" src={pfp} alt="icon" /></a>
		<a href="/"><h1>refact0r</h1></a>
	</div>
	<nav>
		<a class="nav" href="/projects">
			<span class="arrow">-></span><span class="slash">/</span>projects
		</a>
		<a class="nav" href="/blog">
			<span class="arrow">-></span><span class="slash">/</span>blog
		</a>
		<a class="nav" href="/about">
			<span class="arrow">-></span><span class="slash">/</span>about
		</a>
	</nav>
</header>
<div class="container">
	{#key data.pathname}
		<div
			class="transition"
			in:fly={{ duration: 200, delay: 100, x: 0, y: -100 }}
			out:fly={{ duration: 200, x: -0, y: 100 }}
		>
			<slot />
		</div>
	{/key}
</div>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5rem;
		padding: 0 4rem 0 5rem;
		height: 6rem;
		overflow: hidden;
		transition: transform 0.2s ease;
		transform: translateY(0);
		flex-shrink: 0;

		&.home {
			transform: translateY(-70%);
		}

		.row {
			display: flex;
			gap: 1.5rem;
			align-items: center;

			.pfplink {
				display: flex;

				.pfp {
					width: 2rem;
					height: 2rem;
				}
			}

			h1 {
				font-size: 1.5rem;
				margin: 0;
				font-weight: 400;
			}
		}

		nav {
			display: flex;
			gap: 3rem;

			a {
				font-size: 1.5rem;
				font-family: 'Space Mono', monospace;
			}

			.slash &::after {
				top: -6px;
				left: 1.4px;
			}
		}
	}

	.container {
		height: 100%;
		display: grid;
	}

	.transition {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
</style>
