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
