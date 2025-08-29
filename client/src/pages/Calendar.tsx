import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { useTrips } from '../api/useTrips';
import { formatDateForCalendar } from '../util/util';

export default function Calendar() {
  const { trips, loadingTrips } = useTrips();

  if (!trips) return <div>No trips found</div>;
  if (loadingTrips) return <div>Loading...</div>;

  const events = trips.map((trip: Trip) => ({
    title: trip.travellerName,
    date: formatDateForCalendar(trip.fromDate),
  }));

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        viewClassNames={'w-[100] text-xl h-2/3 '}
        events={events}
      />
    </div>
  );
}
