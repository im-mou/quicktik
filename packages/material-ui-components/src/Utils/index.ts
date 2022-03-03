import { formatDistanceToNow, isToday, isTomorrow, format, differenceInMonths } from 'date-fns';

/**
 * Parse a date into someting more ADHD friendly.
 * Possible values -> {'Today', 'Tomorrow', 'in X days', if date > month.days.count ? 'day, dd/MM/yyy'}
 * @param {Date} date
 */
export const getUnderstandableDate = (date: Date) => {
    if (isToday(date)) {
        return 'Today';
    } else if (isTomorrow(date)) {
        return 'Tomorrow';
    } else if (differenceInMonths(new Date(), date) < 0) {
        return format(date, 'eeee, dd/MM/yyyy');
    } else {
        return `${format(date, 'eeee')}, ${formatDistanceToNow(date, { addSuffix: true })}`;
    }
};
