import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../../App';
import DashBoard from '../../features/Dashboard/Dashboard';
import TripList from '../../features/Trips/TripList';
import TripForm from '../../features/Trips/TripForm';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import Travellers from '../../features/Traveler/Travellers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <DashBoard /> },
      {
        path: '/trips',
        element: <TripList></TripList>,
        children: [{ path: ':id', element: <TripForm></TripForm> }],
      },
      { path: '/travellers', element: <Travellers /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },

      {
        path: '*',
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
