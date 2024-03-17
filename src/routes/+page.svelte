<script>
	import pfpin from '$lib/assets/pfpin.json';
	import { onMount } from 'svelte';

	let lottieElem;
	let canvas;

	const chars = ['->', '/>', '<\\', '<-', '</', '\\>'];
	function randomChar() {
		return chars[Math.floor(Math.random() * chars.length)];
	}

	function initGrid() {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		canvas.width = canvas.clientWidth * 2;
		canvas.height = canvas.clientHeight * 2;
		const dpi = window.devicePixelRatio;
		ctx.scale(dpi, dpi);

		return ctx;
	}

	const charSize = 80;
	const fontSize = `${charSize}px 'Space Mono'`;
	const charHeight = charSize * 1;
	const charWidth = charSize * 1;
	async function drawGrid(ctx) {
		if (!canvas) return;

		ctx.font = fontSize;
		ctx.fillStyle = `hsla(220, 10%, 15%, 0.5)`;

		for (let y = 0; y <= canvas.height / charHeight; y++) {
			for (let x = 0; x <= canvas.width / charWidth; x++) {
				const char = randomChar();
				ctx.fillText(char, x * charWidth, y * charHeight);
				// await new Promise((resolve) => setTimeout(resolve, 10));
			}
		}
	}

	onMount(async () => {
		const lottie = await import('lottie-web');
		const animation = lottie.loadAnimation({
			name: 'pfp',
			container: lottieElem,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			animationData: pfpin
		});
		animation.addEventListener('complete', () => {
			if (lottieElem && lottieElem.classList.contains('pfpstart')) {
				lottieElem.classList.add('pfp');
			}
		});
		const ctx = initGrid();
		await drawGrid(ctx);
		// setInterval(async () => {
		// 	await drawGrid(ctx);
		// }, 10000);
		return () => {
			animation.destroy;
		};
	});
</script>

<main>
	<div class="container">
		<div class="background">
			<canvas id="canvas" bind:this={canvas}></canvas>
		</div>
		<div class="row">
			<h1>refact0r</h1>
			<div class="pfpstart" bind:this={lottieElem}></div>
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
		</nav>
	</div>
</main>

<style lang="scss">
	main {
		@include flex(row, center, center);

		height: 100%;
		max-height: calc(100vh - 12rem);
	}

	.container {
		position: relative;
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

	.background {
		position: absolute;
		top: -10rem;
		left: -10rem;
		bottom: -10rem;
		right: -10rem;
		z-index: -1;
	}

	canvas {
		width: 100%;
		height: 100%;
		// image-rendering: pixelated;
	}
</style>
