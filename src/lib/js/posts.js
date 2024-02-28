export function nameFromPath(path) {
	return path.split('/').slice(-1)[0].split('.')[0];
}

export async function getPosts(modules) {
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then((post) => ({
			slug: nameFromPath(path),
			...post.metadata
		}))
	);

	const posts = await Promise.all(postPromises);

	return posts;
}

export async function importImage(image) {
	const pictures = import.meta.glob(
		'/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
		{
			query: {
				enhanced: true
			}
		}
	);

	for (const [path, src] of Object.entries(pictures)) {
		if (path.includes(image)) {
			const img = await src();
			return img.default.img.src;
		}
	}
}
