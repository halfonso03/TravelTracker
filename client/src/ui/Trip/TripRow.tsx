import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TripStatus from '../TripStatus';
import { formatDate } from '../../util/util';
import { formatDistance } from 'date-fns';
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
        <Stacked>
          <span>{trip.travellerName}</span>
          <span style={{ textWrap: 'wrap', width: '8rem' }}>{trip.email}</span>
        </Stacked>
        <Stacked className="self-start">
          <span>{`${formatDate(trip.fromDate)} to ${formatDate(
            trip.toDate
          )}`}</span>
          <span>{t(trip)}</span>
        </Stacked>
        <div className="self-start">
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

function t(trip: Trip) {
  const x = trip.toDate.getTime() - new Date().getTime();

  return x < 0 && trip.statusId == 1 ? (
    <div className="flex ">
      <div className="self-center pr-1">
        <BiAlarmExclamation></BiAlarmExclamation>
      </div>
      <div>
        {'Ended ' +
          formatDistance(new Date(), trip.toDate, { addSuffix: false })}
      </div>
    </div>
  ) : (
    ''
  );
}
