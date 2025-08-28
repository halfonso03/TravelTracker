import { useParams } from 'react-router-dom';
import { useTrips } from '../../api/useTrips';
import TripForm from './TripForm';
import NotFound from '../errors/NotFound';

// const Heading = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// `;

export default function EditTrip() {
  const { id } = useParams();

  const { trip, loadingTrip } = useTrips(id ? +id : null);

  if (!id) return <NotFound></NotFound>;

  if (loadingTrip) return;
  console.log('trip', trip);
  return (
    <div>
      <TripForm trip={trip}></TripForm>
    </div>
  );
}
