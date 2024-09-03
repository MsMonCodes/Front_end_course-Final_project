import { React, useState, useEffect } from 'react';
import { Box, Heading, Flex, Stack, Text, Card, HStack, Container, Button, useDisclosure, Select, useToast } from '@chakra-ui/react';
import { useLoaderData, Link, useNavigate, redirect } from "react-router-dom";
import { SearchBar } from '../components/SearchBar.jsx';
// import { EventForm as FormAddEvent } from '../components/EventForm_Add&Edit.jsx';
import { CiFilter } from "react-icons/ci";
import { FormAddEvent } from '../components/FormAddEvent.jsx';

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  }
}
// export const action = async ({ request, params }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const body = JSON.stringify({ ...formData, eventId: params.eventId });
//   await fetch("http://localhost:3000/events", {
//     method: "POST",
//     body,
//     headers: { "Content-Type": "application/json" },
//   });
//   return null;
// };


// export const action = async ({ request, params }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const body = JSON.stringify({ ...formData, eventId: params.eventId });
//   const response = await fetch("http://localhost:3000/events", {
//     method: "POST",
//     body,
//     headers: { "Content-Type": "application/json" },
//   });
//   const eventObject = await response.json();
//   console.log(eventObject);
//   return {
//     eventObject: events.parse(eventObject),
//   };

//   // return null;
// };

// export const action = async ({ request, params }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const body = JSON.stringify({ ...formData, eventId: params.eventId });
//   const response = await fetch("http://localhost:3000/events", {
//     method: "POST",
//     body,
//     headers: { "Content-Type": "application/json" },
//     loading: { title: "Updating...", description: "Please wait" },
//     success: {
//       title: "Event successfully updated",
//       description: "Looks great",
//       isClosable: true,
//       duration: 3000,
//     },
//     error: {
//       title: "Failed to edit event",
//       description: "Something went wrong",
//     },
//   })
//     .then(response => response.json())
//     .then(await fetch(response))
//     .then(onClose())
//     .then(navigate(`/`))
//   return null;
// };

export const EventsListPage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { events, users, categories } = useLoaderData();
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:3000/events/`);
      const json = await response.json();
      console.log(json);
    }
    fetchEvents(events);
  }, [filteredEvents]);

  const handleDelete = (event) => {
    try {
      event.preventDefault();
      if (window.confirm(`Are you sure you want to delete this event?`)) {
        fetch(`http://localhost:3000/events/${event.target.value}`, {
          method: `DELETE`,
        })
          .then(response => response.json())
          .then(toast({
            title: 'Success!',
            description: 'The event has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          }))
          .finally(navigate(0))
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}. Please try again.`);
    }
  }

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  ////////////////////////////////////////ADDEDD
  // const formData = {};

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/events/`, {
  //       method: `POST`,
  //       body: JSON.stringify(inputs),
  //       headers: { "Content-Type": "application/json;charset=utf-8" },
  //     })
  //       .then(response => response.json())
  //       .then(toast({
  //         title: 'Success!',
  //         description: 'Your new event has been created.',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //       }))
  //   } catch (error) {
  //     console.error(error)
  //     toast({
  //       title: 'Error',
  //       description: 'There was an error while creating the event.',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  //   fetchEvents()
  //     .then(onClose())
  //     .then(navigate(0));
  // }

  // const initialFormAddEvent = {
  //   createdBy: "",
  //   title: "",
  //   description: "",
  //   image: "",
  //   categoryIds: [],
  //   location: "",
  //   startTime: "",
  //   endTime: ""
  // }
  ////////////////////////////////////////

  const categoryHeader = (event) => event.categoryIds.length > 1 ? "Categories:" : "Category:";

  const handleFilter = (event) => {
    const filterByCategory = Number(event.target.value);
    if (filterByCategory === 0) {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((item) => {
      return item.categoryIds.includes(filterByCategory)
    })
    setFilteredEvents(filtered);
  }

  return (
    <>
      <Stack className='event-list' w={'100%'} h={'100%'} align={'center'}>
        <Stack pb={{ base: 6, md: 10 }} gap={4} w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} align={'center'}>

          <Heading py={4} pb={{ base: 4, md: 8 }}>Upcoming events</Heading>

          <HStack w={'100%'} display={'flex'} justifyContent={'flex-end'} gap={2}>
            <SearchBar events={events} placeholder={'Search by title...'} />
            <Box><Select icon={<CiFilter size={25} />} placeholder={"none"} onChange={handleFilter}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}</Select></Box>

            <FormAddEvent onClick={onOpen} onClose={onClose} />


          </HStack>

          <Stack gap={{ base: 0.1, md: 4 }} w={'inherit'}>
            {filteredEvents.map((event) => (
              <Card key={event.id} className='event' h={'xs'} align={{ md: 'center' }}
                justifyContent={'space-between'} borderRadius={{ base: 0, md: 7.5 }}
                bgColor={'blackAlpha.900'} color={'purple.400'} _hover={{
                  marginLeft: -2,
                  color: "pink.500",
                  borderColor: "yellow.500",
                  borderInlineStartWidth: 8,
                  button: { color: 'pink.500' }
                }}>
                <Link to={`event/${event.id}`}>
                  <HStack w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} h={'xs'} justify={{ base: 'flex-start', md: 'space-between' }}>

                    <Container w={{ base: '50vw', md: 'inherit' }}>

                      <Stack pb={{ base: 1, md: 8 }}>
                        <Heading pb={2} size={'lg'} >{event.title}</Heading>
                        <Text letterSpacing={3} fontWeight={'semibold'} fontSize={{ base: 'md', md: 'lg' }}>{event.description}</Text></Stack>

                      <Stack pt={{ base: 4, md: 2 }} justifyContent={'space-around'} rowGap={{ base: 0, md: 2 }}>
                        <Box>{event.startTime.slice(0, 10) === event.endTime.slice(0, 10)
                          ? (<Box><Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                            {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                            <Box gap={1} display={'inline-flex'}>
                              <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.startTime.slice(11, 16)}</Text>
                              - <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                          ) : (<Box gap={1} display={'flex'} flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                              {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3, 10)}  -  {new Date(event.endTime).toDateString().slice(0, 3)}, {new Date(event.endTime).toDateString().slice(3)}</Text></Box>)
                        } </Box>

                        <Box justifyContent={'space-between'}>{event.categoryIds.length > 0
                          ? <Flex gap={{ sm: 0, md: 2 }} display={{ base: 'block', md: 'inline-flex' }}>
                            <Text fontSize={{ base: 'sm', md: 'inherit' }}>{categoryHeader(event)}</Text>
                            {event.categoryIds.map((categoryId) => {
                              return (categories.find((category) => categoryId == category.id))?.name
                            }).join(", ")}</Flex>
                          : null
                        }</Box></Stack></Container>

                    <Flex bgImg={event.image} bgSize={'cover'} w={{ base: '50vw', md: 'lg' }} bgPos={'center'}
                      h={'xs'} justifyContent={'right'} borderRightRadius={{ base: 0, md: 7.5 }}>
                      <Button fontSize={{ base: 'xl', md: '2xl' }} justifyContent={'end'} bg={'none'} color={'purple.300'}
                        method={"delete"}
                        onClick={handleDelete}
                        value={event.id} aria-label='Delete event'
                      >x</Button></Flex></HStack></Link></Card >
            )).reverse()}</Stack></Stack ></Stack >
    </>
  );
};