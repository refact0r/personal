<script>
	import pfpin from '$lib/assets/pfpin.json';
	import { onMount } from 'svelte';

	let lottieElem;
	let canvas;
	let ctx;
	let mouseX = 0;
	let mouseY = 0;

	function initCanvas() {
		if (!canvas) return;

		ctx = canvas.getContext('2d');

		const dpi = window.devicePixelRatio * 2 || 2; // Handle cases without devicePixelRatio
		canvas.width = canvas.parentNode.clientWidth * dpi;
		canvas.height = canvas.parentNode.clientHeight * dpi;

		console.log(canvas.width, canvas.height);

		window.addEventListener('mousemove', (event) => {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			mouseX = ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
			mouseY = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
			drawDots();
		});
	}

	function drawDot(x, y, radius, intensity) {
		ctx.fillStyle = `hsla(220, 11%, 30%, ${intensity})`;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	// Function to draw the entire grid of dots
	function drawDots() {
		const dotRadius = Math.ceil(canvas.width / 600);
		const dotSpacing = dotRadius * 12;
		console.log(dotRadius, dotSpacing);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let x = dotRadius; x < canvas.width; x += dotSpacing) {
			for (let y = dotRadius; y < canvas.height; y += dotSpacing) {
				const dx = Math.abs(x - mouseX);
				const dy = Math.abs(y - mouseY);
				const distance = Math.sqrt(dx * dx + dy * dy);
				const maxDistance = dotSpacing * 7;
				const intensity = 0.3 + 0.7 * Math.max(0, 1 - distance / maxDistance);
				drawDot(x, y, dotRadius, intensity);
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
		initCanvas();
		drawDots();
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
		color: var(--txt-0);
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
		image-rendering: pixelated;
	}
</style>
