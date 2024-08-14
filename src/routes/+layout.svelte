<script>
	import '../app.scss';
	import '$lib/assets/fonts/space-mono.css';
	import '$lib/assets/fonts/space-grotesk.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import { fly } from 'svelte/transition';

	export let data;

	const pages = [
		{ name: 'projects', path: '/projects' },
		{ name: 'blog', path: '/blog' },
		{ name: 'pics', path: '/pics' },
		{ name: 'about', path: '/about' },
		{ name: 'contact', path: '/contact' }
	];

	let prevTwoPages = ['', ''];
	$: {
		prevTwoPages = [prevTwoPages[1], data.pathname];
	}

	function xy(path, isIn = true) {
		if (path === prevTwoPages[0]) {
			return { x: 0, y: 0 };
		}

		let currDepth = path.split('/').length;
		let prevDepth = prevTwoPages[0].split('/').length;
		const getParentPath = (p) => '/' + p.split('/')[1];
		const currParent = getParentPath(path);
		const prevParent = getParentPath(prevTwoPages[0]);
		let currParentIdx = pages.findIndex((page) => page.path === currParent);
		let prevParentIdx = pages.findIndex((page) => page.path === prevParent);

		if (path === '/') {
			currParentIdx = prevParentIdx;
			currDepth = 1;
		}
		if (prevTwoPages[0] === '/') {
			prevParentIdx = currParentIdx;
			prevDepth = 1;
		}

		const xDiff = currParentIdx - prevParentIdx;
		const yDiff = currDepth - prevDepth;

		return { x: `${isIn ? '' : '-'}${xDiff * 20}vh`, y: `${isIn ? '' : '-'}${yDiff * 20}vh` };
	}
</script>

<PageHead
	title={$page.error ? $page.status : $page.data.meta.title}
	description={$page.error ? $page.error.message : $page.data.meta.description}
	type={$page.data.meta.type}
	image={$page.data.meta.image}
/>

<header class:home={$page.url.pathname === '/'}>
	<div class="row">
		<a class="pfp" href="/" aria-label="homepage"><Logo --width="2rem" --height="2rem" /></a>
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
				duration: 100,
				delay: 50,
				...xy(data.pathname)
			}}
			out:fly={{
				duration: 100,
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

			.pfp {
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
			gap: 2.5rem;

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

	@media (max-width: 850px) {
		header {
			padding: 0 1.5rem;
			gap: 1.5rem;

			nav {
				gap: 1.5rem;
			}
		}
	}

	@media (max-width: 700px) {
		header nav {
			display: none;
		}
	}
</style>
