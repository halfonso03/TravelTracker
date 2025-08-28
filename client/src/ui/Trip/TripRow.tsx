import { formatDate } from '../../util/util';
import Table from '../Table';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TripStatus from '../TripStatus';

const StyledNavLink = styled(NavLink)`
  border-bottom: 1px solid var(--color-grey-700) !important;
`;

type Props = {
  trip: Trip;
};

export default function TripRow({ trip }: Props) {
  return (
    <StyledNavLink to={`/trips/${trip.id}`}>
      <Table.Row>
        <Table.Cell>{trip.travellerName}</Table.Cell>
        <Table.Cell>
          {`${formatDate(trip.fromDate)} to ${formatDate(trip.toDate)}`}
        </Table.Cell>
        <Table.Cell align="center">
          {trip.approvedDate && formatDate(trip.approvedDate)}
        </Table.Cell>
        <Table.Cell align="center">{trip.fiduciary}</Table.Cell>
        <Table.Cell>{trip.location}</Table.Cell>
        <Table.Cell textoverflow="ellipses">{trip.description}</Table.Cell>
        <Table.Cell align="center">
          <TripStatus status={trip?.status ? trip.status : ''}>
            {trip.status}
          </TripStatus>
        </Table.Cell>
        <Table.Cell align="center">
          {trip.submittedDate && formatDate(trip.submittedDate)}
        </Table.Cell>
        <Table.Cell align="center">
          {trip.reimbursementSentDate && formatDate(trip.reimbursementSentDate)}
        </Table.Cell>
        <Table.Cell align="center">
          {trip.reimbursementPaidDate && formatDate(trip.reimbursementPaidDate)}
        </Table.Cell>
        {/* <Table.Cell>
          <StyledNavLink to={`/trips/${trip.id}`}>
            <HiEye style={{ fontSize: '1.2rem' }}></HiEye>
          </StyledNavLink>
        </Table.Cell> */}
      </Table.Row>
    </StyledNavLink>
  );
}
