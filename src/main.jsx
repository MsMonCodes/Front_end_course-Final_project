import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventDetailsPage, loader as eventDetailsLoader } from './pages/EventDetailsPage';
import { EventsListPage, action as addEventAction, loader as eventsListLoader } from './pages/EventsListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { ErrorPage } from './pages/ErrorPage';
// import { AddEvent } from './AddEvent';


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
        action: addEventAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/event/:eventId',
        element: <EventDetailsPage />,
        loader: eventDetailsLoader,
        // action: addComment,
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