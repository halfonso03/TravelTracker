import { formatDate } from '../../util/util';
import Table from '../Table';

type Props = {
  trip: Trip;
};

export default function TripRow({ trip }: Props) {
  return (
    <Table.Row>
      <Table.Cell>{trip.id}</Table.Cell>
      <Table.Cell>
        {`${formatDate(trip.fromDate)} to ${formatDate(trip.toDate)}`}
      </Table.Cell>
      <Table.Cell>
        {trip.authorizedDate && formatDate(trip.authorizedDate)}
      </Table.Cell>
      <Table.Cell>{trip.location}</Table.Cell>
      <Table.Cell>
        {trip.reimbursementSubmitDate &&
          formatDate(trip.reimbursementSubmitDate)}
      </Table.Cell>
    </Table.Row>
  );
}
