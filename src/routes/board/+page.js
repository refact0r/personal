export async function load() {
	const imports = import.meta.glob('/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		import: 'default',
		query: {
			enhanced: true,
			w: '2400;2000;1600;1200;800;400'
		}
	});

	let images = [];

	for (const [path, importFunc] of Object.entries(imports)) {
		const src = await importFunc();
		images.push(src);
	}

	images.reverse();

	return {
		images,
		meta: {
			title: 'board',
			description: 'random photos and more.'
		}
	};
}
