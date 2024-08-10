import React from 'react';
import { Box, Heading, Image, Flex, Stack, Text, Card, HStack, Container } from '@chakra-ui/react';
import { useLoaderData, Link } from "react-router-dom";
// import { BreakpointsObject, BreakpointsArray } from '../components/Breakpoints';

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

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  return (
    <>
      <Stack className='event-list'
        w={'100%'}
        h={'100%'}>
        <Heading py={4}>Upcoming events</Heading>
        <Box
          pb={10}>
          {events.map((event) => (
            <Card key={event.id} className='event'
              w={{ base: '100%', md: 'container.sm', lg: 'container.md' }}
              h={'xs'}
              align={{ md: 'center' }}
              // justify={'center'}
              justifyContent={'space-between'}
              my={{ base: 1, md: 4, lg: 8 }}
              borderRadius={{ base: 0, md: 7.5 }}
              // borderBottom={{ sm: 5, md: 'none' }}
              // borderColor={'red.500'}
              bgColor={'blackAlpha.900'}
              color={'purple.400'}
              // color={'whiteAlpha.700'}
              // color={'cyan.600'}
              _hover={{
                color: "pink.500",
                borderColor: "yellow.500",
                borderInlineWidth: '10px',
              }}>
              <Link to={`event/${event.id}`}>
                <HStack
                  w={{ base: '100%', md: 'container.sm', lg: 'container.md' }}
                  h={'xs'}
                  justify={{ base: 'flex-start', md: 'space-between' }}
                >
                  <Container
                    w={{ base: '50vw', md: 'inherit' }}>
                    <Stack pb={8}>
                      {/* <Link to={`event/${event.id}`}> */}
                      <Heading pb={4} size={'lg'}
                      // _hover={{ color: "yellow.300" }}
                      >{event.title}</Heading>
                      {/* </Link> */}
                      <Text letterSpacing={3} fontWeight={'semibold'} fontSize={{ base: 'md', md: 'lg' }}>{event.description}</Text></Stack>

                    <Stack justifyContent={'space-around'} rowGap={{ base: 0, md: 2 }}>
                      <Box >
                        <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                        <Box gap={1} display={'inline-flex'}>
                          <Text fontWeight={'semibold'}>{event.startTime.slice(11, 16)}</Text>
                          - <Text fontWeight={'semibold'}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                      <Box justifyContent={'space-between'}>
                        <Flex gap={{ sm: 0, md: 2 }} display={'flow'}>
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

                  <Box w={{ base: 'xs', md: 'lg' }}>
                    <Image
                      h={'xs'}
                      justifyContent={'right'}
                      borderRightRadius={{ base: 0, md: 7.5 }}
                      objectFit={'cover'}
                      src={event.image}
                      alt={`image of ${event.description}`} /></Box>
                </HStack>
              </Link>
            </Card >

          ))}
        </Box >
      </Stack >
    </>
  );
};