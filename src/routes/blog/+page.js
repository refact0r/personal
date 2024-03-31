import { getPosts } from '$lib/js/posts.js';

export async function load() {
	const modules = import.meta.glob('/src/content/blog/*/*.md');
	const posts = await getPosts(modules);

	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { posts };
}
