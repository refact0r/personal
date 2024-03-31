<script>
	import '../app.scss';
	import '@fontsource/space-mono';
	import '@fontsource-variable/space-grotesk';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import { fly } from 'svelte/transition';

	export let data;
</script>

<svelte:head>
	<script
		async
		defer
		src="/stats/script.js"
		data-website-id="e82247ab-f7f5-44bc-a27b-0f2b08462811"
	></script>
</svelte:head>

<header class:home={$page.url.pathname === '/'}>
	<div class="row">
		<a class="pfplink" href="/" aria-label="homepage"><Logo --width="2rem" --height="2rem" /></a>
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
		<a class="nav" href="/contact">
			<span class="arrow">-></span><span class="slash">/</span>contact
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
		padding: 0 5rem;
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
			}

			h1 {
				font-size: 1.4rem;
				color: var(--txt);
				margin: 0;
			}
		}

		nav {
			display: flex;
			gap: 3rem;

			a {
				font-size: 1.4rem;
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

	@media (max-width: 800px) {
		header {
			padding: 0 1.5rem;
			gap: 1.5rem;

			nav {
				gap: 1.5rem;
			}
		}
	}

	@media (max-width: 650px) {
		header nav {
			display: none;
		}
	}
</style>
