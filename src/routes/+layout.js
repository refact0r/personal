export const prerender = true;

export const load = ({ url }) => {
	const { pathname } = url;

	return {
		pathname,
		meta: {
			title: 'refact0r',
			description: 'my website/portfolio/blog.'
		}
	};
};
