import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../../App';
import DashBoard from '../../pages/Dashboard';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import Travellers from '../../pages/Travellers';
import Calendar from '../../pages/Calendar';
import Reports from '../../pages/Reports';
import TravelList from '../../pages/TravelList';
import EditTrip from '../../features/Trips/EditTrip';
import CreateTrip from '../../features/Trips/CreateTrip';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <DashBoard /> },
      {
        path: '/trips',
        element: <TravelList></TravelList>,
      },
      { path: '/trips/:id', element: <EditTrip></EditTrip> },
      { path: '/trips/new', element: <CreateTrip></CreateTrip> },
      { path: '/travellers', element: <Travellers /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/reports', element: <Reports /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '/server-error', element: <ServerError /> },

      {
        path: '*',
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
