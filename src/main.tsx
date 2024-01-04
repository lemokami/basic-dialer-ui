import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Feed from './screens/Feed.tsx';
import CallDetail from './screens/CallDetail.tsx';
import Archive from './screens/Archive.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/call/:id',
    element: <CallDetail />,
  },
  {
    path: '/archive',
    element: <Archive />,
  },
]);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
