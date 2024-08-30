import React from 'react';
import { Card, Image, Heading, Text, Box, Flex, Container, Stack, StackItem, SimpleGrid, ControlBox, Grid, GridItem, HStack, Button, WrapItem, Center, useDisclosure, useToast, Select } from '@chakra-ui/react';
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import DefaultImage from "../assets/DefaultImage.jpg";
import { FormEditEvent } from '../components/FormEditEvent';
import { EventForm } from '../components/EventForm_Add&Edit';

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  }
}
export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const body = JSON.stringify({ ...formData, eventId: params.eventId });
  await fetch("http://localhost:3000/events", {
    method: "PUT",
    body,
    headers: { "Content-Type": "application/json" },
  });
  return redirect(`/event/${params.eventId}`);
};

export const EventDetailsPage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { event, users, categories } = useLoaderData();

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

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

  ////////////////////////////////////////ADDEDD
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // console.log(e);
    try {
      const response = await fetch(
        `http://localhost:3000/events/${event.id}`, {
        method: `PUT`,
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      })
        .then(response => response.json())
        .then(toast({
          title: 'Success!',
          description: 'This event has been updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        }))
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'There was an error while editing this event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // fetchEvents();
    // console.log(event);
    onClose();
    navigate(`./`);
  }
  ////////////////////////////////////////

  const categoryHeader = (event) => event.categoryIds.length > 1 ? "Event categories" : "Event category";

  return (
    <div className='event-details-page' w={'80%'} h={'100%'} align={'center'}>

      <Stack w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} pb={0} gap={4} >
        <Heading py={4} pb={8}>Event details</Heading>
        <HStack gap={4} justifyContent={'flex-end'} w={'inherit'}>


          {/* ////////////////////////////////////////REMOVED */}
          {/* <EventForm onClick={onOpen} onClose={onClose} fetchEvents={fetchEvents}
            submitMethod={`PUT`} formMethod={"put"} ButtonIcon={<CiCirclePlus size={25} />} /> */}

          {/* ////////////////////////////////////////REPLACED_WITH */}
          {/* <EventForm onClick={onOpen} onClose={onClose} submitEvent={handleSubmit}
            initialFormState={event} formMethod={"put"} ButtonText={'Edit (combined form)'} formData={event} /> */}
          <FormEditEvent onClick={onOpen} onClose={onClose}
          // fetchEvents={fetchEvents} submitEvent={handleSubmit} ButtonText={'Edit'}  formMethod={"put"} initialFormState={event}
          />


          {/* <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'}
            _hover={{ bgColor: 'whiteAlpha.500', cursor: 'pointer' }} onClick={onOpen}>Delete</Button> */}

          <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'}
            // color={'purple.300'} 
            _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }}
            method={"delete"} onClick={handleDelete} value={event.id} aria-label={'Delete event'}>
            Delete</Button>

          {/* <Select icon={<CiFilter size={25} justify={'left'} />} placeholder={'Filter by category'}
            type={'button'} h={10} w={'fit-content'} _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
            onClick={handleFilter()} border={'none'} /> */}

          {/* <Button bgColor={'whiteAlpha.400'} ><Link to="/">Edit - in progress</Link></Button> */}

          <Button bgColor={'whiteAlpha.300'} _hover={{
            bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer'
          }}><Link to="/">Back</Link></Button></HStack>

        <Stack borderRadius={{ base: 0, md: 7.5 }} h={'100%'} w={'100%'} align={'center'} justify={'center'}>
          <Card className='event-detail' w={{ sm: '100%', md: 'container.md' }} h={'fit-content'}
            bgColor={'blackAlpha.900'} color={'pink.500'} mb={10} >

            <Image borderTopRadius={'inherit'} boxSize={'full'} w={{ base: '100%', md: 'container.md' }} height={'full'}
              objectFit={'cover'} src={event.image ? event.image : DefaultImage} alt={`image of ${event.description}`} alignItems={'right'} />

            <Stack paddingBlock={8} w={{ base: '100%', md: 'container.md' }} >
              <Heading color={'yellow.500'} pb={2} size={'2xl'}>{event.title}</Heading>
              <Text color={'purple.500'} letterSpacing={3} fontWeight={'semibold'} fontSize={'xl'}>{event.description}</Text></Stack>

            <HStack bgColor={'whiteAlpha.50'} justifyContent={'space-between'} w={{ base: '100%', md: 'container.md' }}
              display={{ base: 'block', md: 'flex' }} pb={{ base: 16, md: 0 }} borderRadius={'inherit'} h={'fit-content'}>

              <Container justifyContent={'center'} alignContent={'center'} py={0}>
                <Stack align={'center'} justify={'center'}
                  py={{ base: 10, md: 0 }}
                  gap={{ base: 2, md: 'inherit' }} >

                  <Heading fontWeight={'thin'} size={'lg'} pb={{ base: 2, md: 6 }}>Event details</Heading>

                  <Center gap={2} display={{ base: 'block', md: 'inline-flex' }}><Text>Date:</Text>
                    <Center> {event.startTime.slice(0, 10) === event.endTime.slice(0, 10)
                      ? (<HStack><Text fontSize={'lg'} fontWeight={'semibold'}>
                        {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                        <HStack gap={1} display={'inline-flex'}>

                          <Text fontSize={'lg'} fontWeight={'semibold'}>
                            ({event.startTime.slice(11, 16)} - {event.endTime.slice(11, 16)})</Text>

                        </HStack></HStack>)
                      : (<Box gap={1} display={'flex'} flexDir={'column'}>
                        <Text fontSize={'lg'} fontWeight={'semibold'}>
                          {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3, 10)}  -  {new Date(event.endTime).toDateString().slice(0, 3)}, {new Date(event.endTime).toDateString().slice(3)}</Text></Box>)
                    } </Center></Center>

                  <Center>
                    <HStack gap={2} display={{ base: 'block', md: 'inline-flex' }} >
                      <Text verticalAlign={'center'}>Location:</Text>
                      <Text fontSize={'lg'} fontWeight={'semibold'}>{event.location}</Text></HStack></Center>




                  <Box justifyContent={'space-between'}>
                    {event.categoryIds.length > 0
                      ? <Flex gap={{ sm: 0, md: 2 }} display={'flow'}>
                        <Text fontSize={{ base: 'sm', md: 'inherit' }}>{categoryHeader(event)}</Text>
                        {event.categoryIds.map((categoryId) => {
                          return (categories.find((category) => categoryId == category.id))?.name
                        }).join(", ")}</Flex>
                      : null
                    }</Box>



                  <Center>
                    {event.categoryIds.length > 0
                      ? <HStack gap={2} display={{ base: 'block', md: 'inline-flex' }}>
                        <Text>{categoryHeader(event)}</Text>
                        <Text fontSize={'lg'} fontWeight={'semibold'}>
                          {event.categoryIds.map((categoryId) => {
                            return (categories.find((category) => categoryId == category.id)).name
                          }).join(", ")
                          }</Text></HStack>
                      : ''}
                  </Center></Stack></Container>

              <Box mt={{ base: 10, md: 0 }} backgroundImage={users.find((user) => event.createdBy == user.id).image} backgroundSize={'cover'}
                borderBottomRightRadius={{ base: 0, md: 5 }} boxSize={'2xs'}
              // w={'2xs'} h={'2xs'} objectFit={'cover'}
              >
                <Box display={'inline-flex'} gap={4} alignSelf={'center'} color={'purple.700'} >
                  <Text>Hosted by:</Text>
                  <Text fontWeight={'semibold'}>
                    {users.find((user) => event.createdBy == user.id).name}</Text></Box></Box>
            </HStack></Card></Stack></Stack></div >
  );
};

