export default function dateString() {
	const now = new Date();
	const [date, _time] = now.toISOString().split('T');
	const [time] = _time.split('.');

	return [
		date.replace(/-/ug, '.'),
		time.replace(/:/ug, '.'),
	].join('-');
}
