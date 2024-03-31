export function formatDate(date) {
	const d = new Date(date);
	const options = { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric' };
	return d.toLocaleDateString(undefined, options);
}
