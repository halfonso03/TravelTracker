import TripForm from './TripForm';

// const Heading = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// `;
// const SubHeading = styled.div``;

export default function CreateTrip() {
  // const moveBack = useMoveBack();

  const defaultValues: Trip = {
    id: 0,
    travellerName: '',
    location: '',
    description: '',
    fromDate: new Date(),
    toDate: new Date(),
    statusId: 1,
    approvedDate: new Date(),
    fiduciary: 'MCSO',
  };

  function onTripCreated() {
    alert('Trip created');
  }

  function onTripUpdated() {
    alert('Trip updated');
  }

  return (
    <div style={{ width: '80%' }}>
      {/* <Heading>
        <SubHeading></SubHeading>
        <div></div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Heading> */}
      <TripForm
        trip={defaultValues}
        tripCreated={onTripCreated}
        tripUpdated={onTripUpdated}
      ></TripForm>
    </div>
  );
}
