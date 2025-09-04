import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TripStatus from '../TripStatus';
import { formatDate } from '../../util/util';
import { addDays, differenceInCalendarDays, formatDistance } from 'date-fns';
import Table from '../Table';
import { BiAlarmExclamation } from 'react-icons/bi';

const StyledNavLink = styled(NavLink)`
  border-bottom: 1px solid var(--color-grey-700) !important;
`;

type Props = {
  trip: Trip;
};

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-400);
    font-size: 0.88rem;
  }
`;

export default function TripRow({ trip }: Props) {
  return (
    <StyledNavLink to={`/trips/${trip.id}`}>
      <Table.Row>
        <Stacked className="self-start">
          <span>{trip.travellerName}</span>
          <span></span>
          {/* <span style={{ textWrap: 'wrap', width: '8rem' }}>{trip.email}</span> */}
        </Stacked>
        <Stacked className="self-start">
          <span>{`${formatDate(trip.fromDate)} to ${formatDate(
            trip.toDate
          )}`}</span>
          <span>{getDaysElapsedMessage(trip)}</span>
        </Stacked>
        <div className="self-start ">
          {trip.approvedDate && formatDate(trip.approvedDate)}
        </div>
        <div className="px-4 self-start">{trip.fiduciary}</div>
        <div className="self-start">{trip.location}</div>
        <div className="self-start">{trip.description}</div>
        <div className="self-start">
          <TripStatus status={trip?.status ? trip.status : ''}>
            {trip.status}
          </TripStatus>
        </div>
        <div className="text-center self-start">
          {trip.numberDaysSinceSubmitted != undefined &&
            (trip.numberDaysSinceSubmitted > 0
              ? trip.numberDaysSinceSubmitted
              : '')}
        </div>
        <div className="self-start">
          {trip.submittedDate && formatDate(trip.submittedDate)}
        </div>
        <div className="self-start">
          {trip.reimbursementSentDate && formatDate(trip.reimbursementSentDate)}
        </div>
        <div className="self-start">
          {trip.reimbursementPaidDate && formatDate(trip.reimbursementPaidDate)}
        </div>
      </Table.Row>
    </StyledNavLink>
  );
}

function getDaysElapsedMessage(trip: Trip) {
  const today = new Date().getTime();
  const tripToDate = addDays(trip.toDate, 1);

  return (
    <div
      className={
        differenceInCalendarDays(new Date().getTime(), trip.toDate) < 0
          ? 'self-start'
          : 'text-yellow-500 self-start'
      }
    >
      <div className="flex ">
        <div className="self-start pr-1 pt-1">
          <BiAlarmExclamation></BiAlarmExclamation>
        </div>
        <div className="self-start">
          {differenceInCalendarDays(today, tripToDate) > 0
            ? 'Ended ' +
              formatDistance(new Date(), tripToDate, { addSuffix: false }) +
              ' ago'
            : formatDistance(new Date(), trip.fromDate, { addSuffix: false })}
        </div>
      </div>
    </div>
  );
}
