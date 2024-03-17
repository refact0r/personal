<script>
	import pfpin from '$lib/assets/pfpin.json';
	import { onMount } from 'svelte';

	let lottie;

	onMount(async () => {
		lottie = await import('lottie-web');
		let node = document.querySelector('.pfpstart');
		const animation = lottie.loadAnimation({
			name: 'pfp',
			container: node,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			animationData: pfpin
		});
		animation.addEventListener('complete', () => {
			node.classList.add('pfp');
		});
	});
</script>

<main>
	<div class="container">
		<div class="row">
			<h1>refact0r</h1>
			<div class="pfpstart"></div>
		</div>
		<p>hey there! i'm a student interested in comp sci, web dev, design, and more.</p>
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
	</div>
</main>

<style lang="scss">
	main {
		@include flex(row, center, center);

		height: 100%;
		max-height: calc(100vh - 12rem);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	// .pfp {
	// 	width: 3.5rem;
	// 	height: 3.5rem;
	// }

	.pfpstart,
	.pfp {
		width: 4rem;
		height: 4rem;
	}

	h1 {
		font-size: 3.5rem;
		margin: 0;
	}

	nav {
		display: flex;
		gap: 2.5rem;

		a {
			font-size: 1.7rem;
			font-family: 'Space Mono', monospace;
		}
	}

	p {
		font-size: 1.3rem;
		margin: 2rem 0;
	}
</style>
