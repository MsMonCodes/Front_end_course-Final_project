import { React, useState, useRef, useEffect } from 'react';
import { Box, Heading, Image, Flex, Stack, Text, Card, HStack, Container, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Input, FormLabel, Select, Checkbox, CheckboxGroup, Center, RadioGroup, Radio, color, Switch, InputGroup, SimpleGrid, ButtonGroup, useBreakpointValue, Icon, CheckboxIcon, SelectField, List, ListItem, Spacer, IconButton, useToast, InputLeftElement } from '@chakra-ui/react';
import { useLoaderData, Link, Form, redirect, useNavigate } from "react-router-dom";
import { SearchBar } from '../components/SearchBar.jsx';
import { EventForm } from '../components/EventForm';
// import { FilterElement } from '../components/FilterElement.jsx';
import { CiSearch, CiCirclePlus, CiFilter, CiCircleMinus } from "react-icons/ci";
// import { Filter } from '../components/test.jsx';

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
export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const body = JSON.stringify({ ...formData, eventId: params.eventId });
  await fetch("http://localhost:3000/events", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  // return redirect(`/event/${params.eventId}`);
  return null;
};

export const EventsListPage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchEvents = async () => {
    await fetch(`http://localhost:3000/events/`);
  }

  const { events, users, categories } = useLoaderData();

  const [filteredEvents, setFilteredEvents] = useState(events);
  const handleDelete = (event) => {
    try {
      event.preventDefault();
      if (window.confirm(`Are you sure you want to delete this event?`)) {
        fetch(`http://localhost:3000/events/${event.target.value}`, {
          method: `DELETE`,
        })
          .then(fetchEvents())
          .then(response => response.json())
          .then(navigate(0))
          .finally(toast({
            title: 'Success!',
            description: 'The event has been deleted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          }))
        console.log("handleDELETE success");
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}. Please try again.`);
      console.log("handleDELETE error");
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

  const categoryHeader = (event) => event.categoryIds.length > 1 ? "Event categories" : "Event category";

  const handleFilter = (event) => {
    const filterByCat = Number(event.target.value);
    if (filterByCat === 0) {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((item) => {
      return item.categoryIds.includes(filterByCat)
    })
    setFilteredEvents(filtered);
  }

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  return (
    <>
      <Stack className='event-list' w={'100%'} h={'100%'} align={'center'}>
        <Stack pb={{ base: 6, md: 10 }} gap={4} w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} align={'center'}>

          <Heading py={4} pb={{ base: 4, md: 8 }}>Upcoming events</Heading>

          <HStack w={'100%'} display={'flex'} justifyContent={'flex-end'} gap={2}>
            <SearchBar events={events} placeholder={'Search by title...'} />
            <Box >
              <Select icon={<CiFilter size={25} />} placeholder={"None"} onChange={handleFilter}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}</Select>
            </Box>
            <EventForm onClick={onOpen} onClose={onClose} fetchEvents={fetchEvents}
              submitMethod={`POST`} formMethod={"post"} ButtonIcon={<CiCirclePlus size={25} />} /></HStack>

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
                        <Box >
                          {event.startTime.slice(0, 10) === event.endTime.slice(0, 10)
                            ? (<Box><Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                              {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                              <Box gap={1} display={'inline-flex'}>
                                <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.startTime.slice(11, 16)}</Text>
                                - <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                            ) : (<Box gap={1} display={'flex'} flexDir={'column'}>
                              <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                                {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3, 10)}  -  {new Date(event.endTime).toDateString().slice(0, 3)}, {new Date(event.endTime).toDateString().slice(3)}</Text></Box>)
                          } </Box>

                        <Box justifyContent={'space-between'}>
                          {event.categoryIds.length > 0
                            ? <Flex gap={{ sm: 0, md: 2 }} display={'flow'}>
                              <Text fontSize={{ base: 'sm', md: 'inherit' }}>{categoryHeader(event)}</Text>
                              {event.categoryIds.map((categoryId) => {
                                return (categories.find((category) => categoryId == category.id))?.name
                              }).join(", ")}</Flex>
                            : null
                          }</Box></Stack></Container>

                    <Flex bgImg={event.image}
                      // bgImg={event.image ? event.image : DefaultImage}  pos={{ base: 'absolute', md: 'inherit' }}
                      bgSize={'cover'} w={{ base: '50vw', md: 'lg' }}
                      h={'xs'} justifyContent={'right'} borderRightRadius={{ base: 0, md: 7.5 }}>
                      <Button fontSize={{ base: 'xl', md: '2xl' }} justifyContent={'end'} bg={'none'} color={'purple.300'}
                        method={"delete"}
                        onClick={handleDelete}
                        value={event.id} aria-label='Delete event'
                      >x</Button></Flex></HStack></Link></Card >
            ))}</Stack></Stack ></Stack >
    </>
  );
};