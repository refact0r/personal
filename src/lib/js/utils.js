// format a date to look like 02-30-2024
export function formatDate(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
}
