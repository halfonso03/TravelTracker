/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { formatDateForCalendar } from '../util/util';
import {
  useEffect,
  useState,
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from 'react';
import { useTrips } from '../api/hooks/useTrips';

export default function Calendar() {
  const { trips, loadingTrips } = useTrips();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (trips) {
      setEvents(
        trips.map((trip: Trip) => ({
          title: trip.travellerName,
          date: formatDateForCalendar(trip.fromDate),
          travellerName: trip.travellerName,
          extendedProps: {
            description: trip.description,
          },
        }))
      );
    }
  }, [trips]);

  if (!trips) return <div>No trips found</div>;
  if (loadingTrips) return <div>Loading...</div>;

  const renderEventContent = (eventInfo: {
    event: {
      title:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
      extendedProps: {
        description:
          | string
          | number
          | bigint
          | boolean
          | ReactElement<unknown, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | Promise<
              | string
              | number
              | bigint
              | boolean
              | ReactPortal
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined
            >
          | null
          | undefined;
      };
    };
  }) => {
    return (
      <>
        <div>{eventInfo.event.title}</div>
        <div>{eventInfo.event.extendedProps.description}</div>
      </>
    );

    //  <b>{eventInfo.title}</b>
  };
  console.log('events', events);

  function addEvent() {
    setEvents((prev) => [
      ...prev,
      {
        title: 'Nick',
        date: '2025-08-15',
        travellerName: 'Nick',
        extendedProps: {
          description: 'a test',
        },
      },
    ]);
  }

  return (
    <div>
      <button onClick={addEvent}>Add Event Test</button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        viewClassNames={'w-full text-xl h-2/3 '}
        eventContent={renderEventContent}
        events={events}
      />
    </div>
  );
}
