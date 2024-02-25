<script>
	import pfp from '$lib/assets/pfp.svg';
</script>

<main>
	<div class="container">
		<div class="row">
			<h1>refact0r</h1>
			<img class="pfp" src={pfp} alt="icon" />
		</div>
		<p>hey there! i'm a student interested in comp sci, web dev, design, and more.</p>
		<div class="links">
			<a href="/projects"><h2>/projects</h2></a>
			<h2>/blog</h2>
			<h2>/info</h2>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	.pfp {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
	}

	h1 {
		font-size: 3.5rem;
		margin: 0;
	}

	.links {
		display: flex;
		gap: 2.5rem;

		h2 {
			font-size: 1.7rem;
			margin: 0;
		}
	}

	p {
		font-size: 1.3rem;
		margin: 2rem 0;
	}
</style>
