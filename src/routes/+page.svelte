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
			<a href="/projects"><h2><span class="slash">/</span>projects</h2></a>
			<a href="/blog"><h2><span class="slash">/</span>blog</h2></a>
			<a href="/info"><h2><span class="slash">/</span>info</h2></a>
		</div>
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

	.pfp {
		width: 3.5rem;
		height: 3.5rem;
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
