import React from 'react';
import { Card, Image, Heading, Text, Box, Flex, Container, Stack, StackItem, SimpleGrid, ControlBox, Grid, GridItem, HStack, Button, WrapItem, Center } from '@chakra-ui/react';
import { useLoaderData, Link } from "react-router-dom";
import DefaultImage from "../assets/DefaultImage.jpg";

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
  const { event, users, categories } = useLoaderData();

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }
  return (
    <div className='event-details-page' w={'80%'} h={'100%'} align={'center'}>

      <Stack w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} pb={10} gap={4} >
        <Heading py={4} pb={8}>Event details</Heading>
        <HStack gap={4} justifyContent={'flex-end'} w={'inherit'}>
          <Button bgColor={'whiteAlpha.400'} ><Link to="/">Edit - in progress</Link></Button>
          <Button bgColor={'whiteAlpha.400'} ><Link to="/">Back</Link></Button></HStack>

        <Stack borderRadius={{ base: 0, md: 7.5 }} h={'100%'} w={'100%'} align={'center'} justify={'center'}>
          <Card className='event-detail' w={{ sm: '100%', md: 'container.md' }} h={'fit-content'}
            bgColor={'blackAlpha.900'} color={'pink.500'} mb={10} >

            <Image borderTopRadius={'inherit'} boxSize={'full'} w={{ base: '100%', md: 'container.md' }} height={'full'}
              objectFit={'cover'} src={event.image ? event.image : DefaultImage} alt={`image of ${event.description}`} alignItems={'right'} />

            <Stack paddingBlock={8} w={{ base: '100%', md: 'container.md' }} >
              <Heading color={'yellow.500'} pb={2} size={'2xl'}>{event.title}</Heading>
              <Text color={'purple.500'} letterSpacing={3} fontWeight={'semibold'} fontSize={'xl'}>{event.description}</Text></Stack>

            <HStack bgColor={'whiteAlpha.50'} justifyContent={'space-between'} w={{ base: '100%', md: 'container.md' }}
              display={{ base: 'block', md: 'flex' }} pb={{ base: 16, md: 0 }} borderRadius={'inherit'} >

              <Container justifyContent={'center'} alignContent={'center'} py={0}>
                <Stack align={'center'} justify={'center'} py={10} gap={{ base: 2, md: 'inherit' }} >

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

                  <Center><HStack gap={2} display={{ base: 'block', md: 'inline-flex' }}>
                    {event.categoryIds.length > 1
                      ? <Text>Categories:</Text>
                      : <Text>Category:</Text>}
                    <Text fontSize={'lg'} fontWeight={'semibold'}>
                      {event.categoryIds.map((categoryId) => {
                        return (categories.find((category) => categoryId == category.id)).name
                      }).join(", ")
                      }</Text></HStack></Center></Stack></Container>

              <Box mt={{ base: 10, md: 0 }} backgroundImage={users.find((user) => event.createdBy == user.id).image} backgroundSize={'cover'}
                borderBottomRightRadius={{ base: 0, md: 5 }} boxSize={'2xs'}
              // w={'2xs'} h={'2xs'} objectFit={'cover'}
              >
                <Box display={'inline-flex'} gap={4} alignSelf={'center'} color={'purple.700'} >
                  <Text>Hosted by:</Text>
                  <Text fontWeight={'semibold'}>
                    {users.find((user) => event.createdBy == user.id).name}</Text></Box></Box>
            </HStack></Card></Stack></Stack></div>
  );
};

