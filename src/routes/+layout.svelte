<script>
	import '../app.scss';
	import '@fontsource/space-mono/latin-400.css';
	import '@fontsource/space-mono/latin-400-italic.css';
	import '@fontsource-variable/space-grotesk';
	import '$lib/assets/prism-material-oceanic.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import { fly } from 'svelte/transition';

	export let data;

	const pages = [
		{ name: 'projects', path: '/projects' },
		{ name: 'blog', path: '/blog' },
		{ name: 'about', path: '/about' },
		{ name: 'contact', path: '/contact' }
	];

	// give me some method to remember the previous page path
	let prevTwoPages = ['', ''];
	$: {
		prevTwoPages = [prevTwoPages[1], data.pathname];
		console.log(prevTwoPages);
	}

	function xy(path, isIn = true) {
		if (path === '/') {
			return {
				x: 0,
				y: isIn ? '-20vh' : '20vh'
			};
		} else if (prevTwoPages[0] === '/') {
			return {
				x: 0,
				y: isIn ? '20vh' : '-20vh'
			};
		}
		const currIdx = pages.findIndex((page) => path.startsWith(page.path));
		const prevIdx = pages.findIndex((page) => prevTwoPages[0].startsWith(page.path));
		if (currIdx == prevIdx) {
			const currLength = path.split('/').length;
			const prevLength = prevTwoPages[0].split('/').length;
			if (currLength === prevLength) {
				return {
					x: 0,
					y: 0
				};
			} else if (path.split('/').length > prevTwoPages[0].split('/').length) {
				return {
					x: 0,
					y: isIn ? '20vh' : '-20vh'
				};
			} else {
				return {
					x: 0,
					y: isIn ? '-20vh' : '20vh'
				};
			}
		} else if (currIdx > prevIdx) {
			return {
				x: isIn ? '20vw' : '-20vw',
				y: 0
			};
		} else {
			return {
				x: isIn ? '-20vw' : '20vw',
				y: 0
			};
		}
	}
</script>

<header class:home={$page.url.pathname === '/'}>
	<div class="row">
		<a class="pfplink" href="/" aria-label="homepage"><Logo --width="2rem" --height="2rem" /></a>
		<a href="/"><h1>refact0r</h1></a>
	</div>
	<nav>
		{#each pages as { name, path }}
			<a class="nav" href={path}>
				<span class="arrow">-></span><span class="slash">/</span>{name}
			</a>
		{/each}
	</nav>
</header>
<div class="container">
	{#key data.pathname}
		<div
			class="transition"
			in:fly={{
				duration: 150,
				delay: 50,
				...xy(data.pathname)
			}}
			out:fly={{
				duration: 150,
				...xy(data.pathname, false)
			}}
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
		transition: transform 0.1s ease;
		transform: translateY(0);
		flex-shrink: 0;

		&.home {
			transform: translateY(-70%);
		}

		.row {
			@include flex(row, null, center);
			gap: 1.5rem;

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
