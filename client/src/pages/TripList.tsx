import Heading from '../ui/Heading';
import Table from '../ui/Table';
import TripRow from '../ui/Trip/TripRow';

export default function TripList() {
  const data: Trip[] = [
    {
      id: 1,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      location: 'Denver, CO',
      authorizedDate: new Date(),
    },
  ];

  return (
    <>
      <Heading as="h3">All Trips</Heading>
      <Table columns=".35fr .6fr .6fr .6fr .6fr .6fr .6fr .6fr">
        <Table.Header>
          <Table.Cell>Traveller</Table.Cell>
          <Table.Cell>Travel Dates</Table.Cell>
          <Table.Cell>Authorized Date</Table.Cell>
          <Table.Cell>Location</Table.Cell>
          <Table.Cell>Reimbursement Submitted On</Table.Cell>
          <Table.Cell>Fiduciary</Table.Cell>
          <Table.Cell>Send to Fiduciary</Table.Cell>
          <Table.Cell>Paid Date</Table.Cell>
        </Table.Header>
        <Table.Body
          data={data}
          render={(trip: Trip) => <TripRow trip={trip} key={trip.id}></TripRow>}
        ></Table.Body>
      </Table>
    </>
  );
}
