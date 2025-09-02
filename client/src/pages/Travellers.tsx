import { useTravellers } from '../api/hooks/useTravellers';
import TravellerRow from '../features/Travellers/TravellerRow';
import { Box } from '../ui/Box';
import Table from '../ui/Table';

export default function Travellers() {
  const { travellers, loadingTravellers } = useTravellers();

  if (loadingTravellers) return <div>Loading...</div>;

  return (
    <Box className="w-2/5">
      {/*<Header>
         <div className="flex justify-between">
          <div>All Trips</div>
          <div>
            <Button variation="primary" onClick={() => navigate('/trips/new')}>
              Create Trip
            </Button>
          </div>
        </div>
      </Header> */}
      <Table columns=".3fr .3fr .5fr">
        <Table.Header>
          <Table.Cell>First Name</Table.Cell>
          <Table.Cell>Last Name</Table.Cell>
          <Table.Cell>Email</Table.Cell>
        </Table.Header>
        <Table.Body
          data={travellers as Traveller[]}
          render={(traveller: Traveller) => (
            <TravellerRow
              traveller={traveller}
              key={traveller.id}
            ></TravellerRow>
          )}
        ></Table.Body>
      </Table>
    </Box>
  );
}
