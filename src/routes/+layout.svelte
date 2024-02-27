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
	<div class="links">
		<a href="/projects"><h2><span class="slash">/</span>projects</h2></a>
		<a href="/blog"><h2><span class="slash">/</span>blog</h2></a>
		<a href="/info"><h2><span class="slash">/</span>info</h2></a>
	</div>
</header>
<div class="container">
	{#key data.pathname}
		<div
			class="transition"
			in:fly={{ duration: 300, delay: 100, x: 0, y: -100 }}
			out:fly={{ duration: 300, x: -0, y: 100 }}
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

				.pfp {
					width: 2rem;
					height: 2rem;
				}
			}

			h1 {
				font-size: 1.5rem;
				margin: 0;
			}
		}

		.links {
			display: flex;
			gap: 2rem;

			h2 {
				font-size: 1.5rem;
				margin: 0;
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
