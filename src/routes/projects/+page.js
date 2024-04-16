import { getPosts } from '$lib/js/posts.js';

export async function load() {
	const modules = import.meta.glob('/src/content/projects/*/*.md');
	let posts = await getPosts(modules);

	return {
		posts,
		meta: {
			title: 'projects',
			description: "projects i've worked on."
		}
	};
}
