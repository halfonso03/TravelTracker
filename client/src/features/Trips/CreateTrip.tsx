import TripForm from './TripForm';

export default function CreateTrip() {
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
    // alert('Trip created');
  }

  function onTripUpdated() {
    alert('Trip updated');
  }

  return (
    <TripForm
      trip={defaultValues}
      tripCreated={onTripCreated}
      tripUpdated={onTripUpdated}
    ></TripForm>
  );
}
