<script>
	import pfpin from '$lib/assets/pfpin.json';
	import { onMount } from 'svelte';

	let lottie;

	onMount(async () => {
		lottie = await import('lottie-web/build/player/lottie_light.min.js');
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
			<a class="nav" href="/pics">
				<span class="arrow">-></span><span class="slash">/</span>pics
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
		margin: 0 1.5rem;
	}

	.row {
		@include flex(row, null, center);
		gap: 2rem;
	}

	.pfpstart,
	.pfp {
		width: 3.75rem;
		height: 3.75rem;
	}

	h1 {
		font-size: 3.2rem;
		margin: 0;
	}

	nav {
		display: flex;
		gap: 2rem;

		a {
			font-size: 1.5rem;
			font-family: 'Space Mono', monospace;
		}
	}

	p {
		font-size: 1.2rem;
		margin: 1.25rem 0;
	}

	@media (max-width: 600px) {
		nav {
			flex-direction: column;
			gap: 1rem;
		}
		.row {
			flex-direction: column-reverse;
			gap: 0.5rem;
			align-items: flex-start;
		}
	}
</style>
