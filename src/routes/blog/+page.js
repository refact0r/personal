import { getPosts } from '$lib/js/posts.js';
import { dev } from '$app/environment';

export async function load() {
	const modules = import.meta.glob('/src/content/blog/*/*.md');
	let posts = await getPosts(modules);

	if (!dev) {
		posts = posts.filter((post) => post.published);
	}
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { posts };
}
