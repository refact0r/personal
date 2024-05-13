<script>
	import { page } from '$app/stores';

	export let title;
	export let description;
	export let type = 'website';
	export let image = null;

	// async function importOgImage() {
	// 	const images = import.meta.glob(`/src/content/*/*/*.{jpg,png}`, {
	// 		eager: true,
	// 		import: 'default'
	// 	});
	// 	for (const [path, src] of Object.entries(images)) {
	// 		if (path.includes(image)) {
	// 			console.log(src);
	// 			return src;
	// 		}
	// 	}
	// }
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:site_name" content="refact0r.dev" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@refact_r" />
	<meta name="twitter:creator" content="@refact_r" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta property="og:image" content={'https://www.refact0r.dev' + image.img.src} />
		<meta property="og:image:width" content={image.img.w} />
		<meta property="og:image:height" content={image.img.h} />
		<meta property="og:image:alt" content={title} />
		<meta name="twitter:image" content={'https://www.refact0r.dev' + image.img.src} />
		<meta name="twitter:image:alt" content={title} />
		<!-- {/await} -->
	{/if}
</svelte:head>
