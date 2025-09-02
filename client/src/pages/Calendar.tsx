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
import { Box } from '../ui/Box';
import TripStatus from '../ui/TripStatus';
import { NavLink } from 'react-router-dom';

function getStatus(statusId: number) {
  if (statusId == 1) return 'Open';
  if (statusId == 2) return 'Closed';
  if (statusId == 3) return 'Cancelled';
  return 'unknown';
}

export default function Calendar() {
  const { trips, loadingTrips } = useTrips();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (trips) {
      setEvents(
        trips.map((trip: Trip) => ({
          title: trip.travellerName,
          start: formatDateForCalendar(trip.fromDate),
          end: formatDateForCalendar(trip.toDate),
          travellerName: trip.travellerName,
          extendedProps: {
            description: trip.description,
            id: trip.id,
            statusId: trip.statusId,
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
        id: number;
        statusId: number;
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
      <NavLink to={`/trips/${eventInfo.event.extendedProps.id}`}>
        <div className="rounded-[4px] py-2 pl-3 mb-3 z-10 m-2 border-l-1 border-1 border-zinc-500 bg-gray-900 flex justify-between align-top">
          <div>
            <div className="">{eventInfo.event.title}</div>
            <div className="text-gray-400">
              {eventInfo.event.extendedProps.description}
            </div>
          </div>

          <div className="mr-3 mt-1">
            <TripStatus
              status={getStatus(eventInfo.event.extendedProps.statusId)}
            >
              <div className="text-xs pl-2 px-2">
                {getStatus(eventInfo.event.extendedProps.statusId)}
              </div>
            </TripStatus>
          </div>
        </div>
      </NavLink>
    );
  };

  // function addEvent() {
  //   setEvents((prev) => [
  //     ...prev,
  //     {
  //       title: 'Nick',
  //       travellerName: 'Nick',
  //       extendedProps: {
  //         description: 'a test',
  //       },
  //     },
  //   ]);
  // }

  return (
    <Box>
      {/* <button onClick={addEvent} className=" bg-gray-600 text-wrap">
        Add Event Test
      </button> */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        viewClassNames={'w-full text-lg h-2/3 '}
        eventClassNames={'p-0'}
        fixedWeekCount={false}
        contentHeight={'auto'}
        eventContent={renderEventContent}
        events={events}
      />
    </Box>
  );
}
