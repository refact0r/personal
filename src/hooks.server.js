/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	return resolve(event, {
		preload: ({ type }) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});
}
