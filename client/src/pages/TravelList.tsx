import { useNavigate } from 'react-router-dom';
import { useTrips } from '../api/useTrips';
import Header from '../features/Layout/Header';
import Button from '../ui/Button';
import Table from '../ui/Table';
import TripRow from '../ui/Trip/TripRow';

export default function TravelList() {
  const { trips, loadingTrips } = useTrips();
  const navigate = useNavigate();

  if (loadingTrips) return <div>Loading...</div>;

  return (
    <>
      <Header>
        <div className="flex justify-between">
          <div>All Trips</div>
          <div>
            <Button
              variation="primary"
              size="medium"
              onClick={() => navigate('/trips/new')}
            >
              Create Trip
            </Button>
          </div>
        </div>
      </Header>
      <Table columns=".6fr .6fr .4fr .2fr .4fr .6fr .4fr .5fr .5fr .5fr">
        <Table.Header>
          <Table.Cell>Traveller</Table.Cell>
          <Table.Cell>Travel Dates</Table.Cell>
          <Table.Cell>Auth. Date</Table.Cell>
          <Table.Cell>Fiduciary</Table.Cell>
          <Table.Cell>Location</Table.Cell>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell align="center">Status</Table.Cell>
          <Table.Cell>Reimbursement Submitted Date</Table.Cell>
          <Table.Cell>Sent to Fiduciary Date</Table.Cell>
          <Table.Cell>Paid Date</Table.Cell>
          {/* <Table.Cell></Table.Cell> */}
        </Table.Header>
        <Table.Body
          data={trips as Trip[]}
          render={(trip: Trip) => <TripRow trip={trip} key={trip.id}></TripRow>}
        ></Table.Body>
        <Table.Footer>
          <div>footer</div>
        </Table.Footer>
      </Table>
    </>
  );
}
