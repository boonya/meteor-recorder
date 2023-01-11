import dateString from './date-string';

beforeEach(() => {
	jest.useFakeTimers().setSystemTime(new Date('2023-01-11T14:11:19').getTime());
});

it('should return formatted string.', () => {
	expect(dateString()).toBe('2023.01.11-14.11.19');
});
