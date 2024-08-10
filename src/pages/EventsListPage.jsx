import React from 'react';
import { Box, Heading, SimpleGrid, Image, Flex, Stack, Text, Card, HStack, Container } from '@chakra-ui/react';
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  // const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    events: await events.json(),
    // users: await users.json(),
    categories: await categories.json(),
  }
}

export const EventsListPage = () => {
  const { events,
    // users, 
    categories } = useLoaderData();
  // console.log({ events, users, categories });


  return (
    <>
      <Stack className='event-list'>
        <Heading py={4}>Upcoming events</Heading>
        <Box>
          {events.map((event) => (

            <Card key={event.id} className='event'
              w={'container.md'}
              h={'xs'}
              align={'center'}
              justify={'center'}
              justifyContent={'space-between'}
              my={'30px'}
              // paddingInlineStart={4}
              bgColor={'blackAlpha.900'}
              color={'purple.400'}
              // color={'whiteAlpha.700'}
              // color={'cyan.600'}
              _hover={{
                color: "pink.500",
                // borderBottom: '4px',
                // mb: '20px',
                borderColor: "yellow.500",
                borderInlineWidth: '10px',
              }}>
              <Link to={`event/${event.id}`}>
                <HStack
                  w={'container.md'}
                  h={'xs'}
                  // blockSize={'sm'}
                  justifyContent={'space-between'}
                // gap={16}
                // p={2}
                >
                  <Container>

                    <Stack pb={8}>
                      {/* <Link to={`event/${event.id}`}> */}
                      <Heading pb={4} size={'lg'}
                      // _hover={{ color: "yellow.300" }}
                      >{event.title}</Heading>
                      {/* </Link> */}
                      <Text letterSpacing={3} fontWeight={'semibold'} fontSize={'lg'}>{event.description}</Text></Stack>

                    <Stack justifyContent={'space-around'} rowGap={2}>
                      <Box >
                        <Text fontWeight={'semibold'}>{new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                        <Box gap={1} display={'inline-flex'}>
                          <Text fontWeight={'semibold'}>{event.startTime.slice(11, 16)}</Text>
                          - <Text fontWeight={'semibold'}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                      <Box justifyContent={'space-between'}>
                        <Flex gap={2} display={'flow'}>
                          {
                            event.categoryIds.length > 1
                              ? <Text>Event categories:</Text>
                              : <Text>Event category:</Text>
                          }
                          <Box>{
                            event.categoryIds.map((categoryId) => {
                              return (categories.find((category) => categoryId == category.id)).name
                            }).join(", ")}</Box></Flex></Box></Stack>
                  </Container>

                  <Image
                    h={'xs'}
                    justifyContent={'right'}
                    borderRightRadius={'inherit'}
                    objectFit={'cover'}
                    w={'40vw'}
                    src={event.image}
                    alt={`image of ${event.description}`} />

                </HStack>
              </Link>

            </Card >

          ))}
        </Box>
      </Stack >
    </>
  );
};