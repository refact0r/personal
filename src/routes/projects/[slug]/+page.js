import { nameFromPath } from '$lib/js/posts.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const modules = import.meta.glob('/src/content/projects/*/*.md');

	let match = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (nameFromPath(path) === params.slug) {
			match = { path, resolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post) {
		throw error(404, 'project not found');
	}

	return { post };
}
