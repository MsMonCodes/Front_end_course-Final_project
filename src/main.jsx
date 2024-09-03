import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  EventDetailsPage,
  loader as eventDetailsLoader,
  // action as actionEditEvent 
} from './pages/EventDetailsPage';
import {
  EventsListPage,
  loader as eventsListLoader
  // action as actionAddEvent, 
} from './pages/EventsListPage';
import { actionEditEvent } from './components/FormEditEvent';
import { actionAddEvent } from './components/FormAddEvent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <EventsListPage />,
        loader: eventsListLoader,
        action: actionAddEvent,
        errorElement: <ErrorPage />,
      },
      {
        path: '/event/:eventId',
        element: <EventDetailsPage />,
        loader: eventDetailsLoader,
        action: actionEditEvent,
      },
      // {
      //   path: '/event/new',
      //   element: <EventForm />,
      // },
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