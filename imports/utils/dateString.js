export default function dateString() {
	const now = new Date();
	const [date] = now.toISOString().split('T');
	const [time] = now.toTimeString().split(' ');

	return [
		date.replace(/-/ug, '.'),
		time.replace(/:/ug, '.'),
	].join('-');
}
