import { dev } from '$app/environment';

export function nameFromPath(path) {
	return path.split('/').slice(-1)[0].split('.')[0].replace(/^\++/, '');
}

export async function getPosts(modules) {
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then((post) => ({
			slug: nameFromPath(path),
			...post.metadata
		}))
	);

	let posts = await Promise.all(postPromises);

	if (!dev) {
		posts = posts.filter((post) => post.published);
	}

	return posts;
}

export async function importOgImage(imagePath) {
	const images = import.meta.glob(`/src/content/*/*/*.{jpg,png}`, {
		import: 'default',
		query: {
			enhanced: true,
			w: '1200',
			format: 'jpg;png'
		}
	});
	for (const [path, src] of Object.entries(images)) {
		if (path.includes(imagePath)) {
			return await src();
		}
	}
}
