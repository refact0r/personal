<script>
	export let title;
	export let description;
	export let type = 'website';
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />
	<meta property="og:site_name" content="refact0r" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:description" content={description} />
</svelte:head>
