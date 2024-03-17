<script>
	import pfpin from '$lib/assets/pfpin.json';
	import { onMount } from 'svelte';

	let lottieElem;
	let canvas;
	let ctx;
	let mouseX = -1000;
	let mouseY = -1000;
	let initOpacity = 0;
	let timer;

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

	function drawDot(x, y, radius) {
		ctx.fillStyle = `hsla(${190 + (100 * (y / canvas.height + x / canvas.width)) / 2}, 70%, 70%, 0.7)`;
		ctx.fillStyle = `hsla(220, 11%, 50%, 1)`;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	// Function to draw the entire grid of dots
	function drawDots() {
		if (!canvas) return;
		if (initOpacity < 1) {
			initOpacity += 0.01;
			canvas.style.opacity = initOpacity;
		} else {
			clearInterval(timer);
		}
		const dotRadius = Math.ceil(canvas.width / 600);
		const dotSpacing = Math.ceil(canvas.width / 37);
		console.log(dotRadius, dotSpacing);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let x = dotRadius * 3; x < canvas.width; x += dotSpacing) {
			let offset;
			if (x % (dotSpacing * 2) === dotRadius * 3) offset = 0;
			else offset = dotSpacing / 2;
			for (let y = dotRadius * 3 + offset; y < canvas.height; y += dotSpacing) {
				const dx = Math.abs(x - mouseX);
				const dy = Math.abs(y - mouseY);
				const distance = Math.sqrt(dx * dx + dy * dy);
				const maxDistance = dotSpacing * 5;
				const intensity = 1 + 2 * Math.max(0, 1 - distance / maxDistance);
				drawDot(x, y, dotRadius * intensity);
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
		timer = setInterval(drawDots, 10);
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

	.container {
		position: relative;
	}

	.row {
		justify-content: space-between;
		display: flex;
		align-items: center;
		gap: 2.5rem;
		margin: 1rem 0 0 0;
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
		justify-content: space-between;

		a {
			font-size: 1.7rem;
			font-family: 'Space Mono', monospace;
		}
	}

	p {
		font-size: 1.3rem;
		margin: 2rem 0 2rem 0;
	}

	.background {
		// position: absolute;
		// top: -10rem;
		// left: -10rem;
		// bottom: -10rem;
		// right: -10rem;
		z-index: -1;
		height: 20rem;
		width: 47rem;
	}

	canvas {
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
	}
</style>
