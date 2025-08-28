import { format } from "date-fns";

export function formatDate(date: Date) {
    return format(date, "M/d/yy ");
}

export function formatDateForCalendar(date: Date) {
    return format(date, "yyyy-MM-dd");
}

// export const requiredString = (fieldName: string) =>
//     z
//         .string({ error: `${fieldName} is required` })
//         .min(1, { error: `${fieldName} is required` });

// export function timeAgo(date: DateArg<Date>) {
//     return formatDistanceToNow(date) + " ago";
// }
