import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventDetailsPage, loader as eventDetailsLoader } from './pages/EventDetailsPage';
import { EventsListPage, loader as eventsListLoader } from './pages/EventsListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsListPage />,
        loader: eventsListLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventDetailsPage />,
        loader: eventDetailsLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);