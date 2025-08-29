import { formatDate } from '../../util/util';
import Table from '../Table';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TripStatus from '../TripStatus';

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
    color: var(--color-grey-500);
  }
`;

export default function TripRow({ trip }: Props) {
  return (
    <StyledNavLink to={`/trips/${trip.id}`}>
      <Table.Row>
        <Stacked>
          <span>{trip.travellerName}</span>
          <span style={{}}>trvellaser@l.com</span>
        </Stacked>
        <div>{`${formatDate(trip.fromDate)} to ${formatDate(
          trip.toDate
        )}`}</div>
        <div>{trip.approvedDate && formatDate(trip.approvedDate)}</div>
        <div className="px-4">{trip.fiduciary}</div>
        <div>{trip.location}</div>
        <div>{trip.description}</div>
        <div>
          <TripStatus status={trip?.status ? trip.status : ''}>
            {trip.status}
          </TripStatus>
        </div>
        <div>{trip.submittedDate && formatDate(trip.submittedDate)}</div>
        <div>
          {trip.reimbursementSentDate && formatDate(trip.reimbursementSentDate)}
        </div>
        <div>
          {trip.reimbursementPaidDate && formatDate(trip.reimbursementPaidDate)}
        </div>
      </Table.Row>
    </StyledNavLink>
  );
}
