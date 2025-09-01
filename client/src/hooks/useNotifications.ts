import { addDays, differenceInDays } from "date-fns";



export const FIVE_DAYS_SINCE_TRIP_ENDED = 'FiveDaysSinceSubmitted';
export const TEN_DAYS_SINCE_TRIP_ENDED = 'TenDaysSinceSubmitted';
export const X_DAYS_SINCE_SUBMITTED_AND_NOT_SENT = 'XDaysSinceSubmmitedAndNotSent';
export const OVER_FIVE_DAYS_TO_SUBMIT = 'OVerFiveDaysToSubmit';

/*
    level 0 = information
    level 1 = warning
    level 2 = danger
*/
export const Alerts: Alert[] = [
    {
        id: 1, name: FIVE_DAYS_SINCE_TRIP_ENDED, message: 'Over five days since trip ended and not submitted', level: 1
    },
    {
        id: 2, name: TEN_DAYS_SINCE_TRIP_ENDED, message: 'Over ten days since trip ended and not submitted', level: 2
    },
    {
        id: 3, name: X_DAYS_SINCE_SUBMITTED_AND_NOT_SENT, message: 'Three days since submitted and not sent to fiduciary', level: 2
    },
    {
        id: 4, name: OVER_FIVE_DAYS_TO_SUBMIT, message: 'Reimbursement five days or more to submit to NHAC', level: 0
    }
]

export function useNotifications(trip: Trip | undefined) {



    const getClockStart = () => {
        if (!trip) return null;
        return addDays(new Date(new Date(trip.toDate).setHours(8, 0, 0)), 1);
    }


    function getNotifications(): Alert[] | null {


        if (!trip) return null;

        const alerts: Alert[] = [];
        const today = new Date().setHours(8, 0, 0);

        console.log(new Date(new Date(trip.toDate).setHours(8, 0, 0)));

        const toDateFollowingDay = addDays(new Date(new Date(trip.toDate).setHours(8, 0, 0)), 1);

        if (!trip.submittedDate) {

            const days = differenceInDays(today, toDateFollowingDay);

            if (days > 5 && days < 10) {
                alerts.push(Alerts.filter(x => x.name == FIVE_DAYS_SINCE_TRIP_ENDED)[0]);
            } else if (days >= 10) {
                alerts.push(Alerts.filter(x => x.name == TEN_DAYS_SINCE_TRIP_ENDED)[0]);
            }
        }

        if (trip.submittedDate) {

            const submittedDate = new Date(new Date(trip.submittedDate!).setHours(8, 0, 0));

            if (!trip.reimbursementSentDate) {
                if (differenceInDays(today, submittedDate) > 3) {

                    alerts.push(Alerts.filter(x => x.name == X_DAYS_SINCE_SUBMITTED_AND_NOT_SENT)[0]);
                }
            }

            // add info messages          
            if (differenceInDays(submittedDate, toDateFollowingDay) >= 5) {
                alerts.push(Alerts.filter(x => x.name == OVER_FIVE_DAYS_TO_SUBMIT)[0]);
            }

        }


        return alerts;
    }

    return { getNotifications, getClockStart }
}





