import { useParams } from 'react-router-dom';
import TripForm from './TripForm';
import NotFound from '../errors/NotFound';
import { useTrip } from '../../api/useTrip';

// const Heading = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// `;

export default function EditTrip() {
  const params = useParams();
  const id = params!.id!;

  const { trip, loadingTrip } = useTrip(id);

  if (!id) return <NotFound></NotFound>;

  if (loadingTrip) return;

  return <TripForm trip={trip!}></TripForm>;
}
