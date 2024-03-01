export function formatDate(date) {
	const str = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
	return str.replace(/\//g, '.');
}
