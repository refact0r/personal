<script>
	import '../app.scss';
	import '@fontsource/space-mono';
	import '@fontsource-variable/space-grotesk';
</script>

<div class="content">
	<slot />
</div>

<style lang="scss">
	.content {
		min-height: 100vh;
		height: 100%;
	}
</style>
