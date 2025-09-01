import { useParams } from 'react-router-dom';
import TripForm from './TripForm';
import NotFound from '../errors/NotFound';
import { useTrip } from '../../api/hooks/useTrip';
import { useNotifications } from '../../hooks/useNotifications';

// const Heading = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// `;

export default function EditTrip() {
  const params = useParams();
  const id = params!.id!;

  const { trip, loadingTrip } = useTrip(id);
  const { getNotifications, getClockStart } = useNotifications(trip);

  if (!id) return <NotFound></NotFound>;

  if (loadingTrip) return;

  const alerts = getNotifications();
  const clockStart = getClockStart();

  return (
    <TripForm trip={trip!} alerts={alerts} clockStart={clockStart}></TripForm>
  );
}
