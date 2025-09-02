import Table from '../../ui/Table';

type Props = {
  traveller: Traveller;
};

export default function TravellerRow({ traveller }: Props) {
  return (
    <Table.Row>
      <Table.Cell>{traveller.firstName}</Table.Cell>
      <Table.Cell>{traveller.lastName}</Table.Cell>
      <Table.Cell>{traveller.email}</Table.Cell>
    </Table.Row>
  );
}
