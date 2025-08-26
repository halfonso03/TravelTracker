import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from './styles/GlobalStyles';
import { router } from './app/router/Routes.tsx';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles></GlobalStyles>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
