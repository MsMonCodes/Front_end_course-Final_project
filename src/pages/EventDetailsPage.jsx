import React from 'react';
import { Card, Image, Heading, Text, Box, Flex, Container, Stack, StackItem, SimpleGrid, ControlBox, Grid, GridItem, HStack } from '@chakra-ui/react';
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  }
}

export const EventDetailsPage = () => {
  const { event, users, categories } = useLoaderData();

  return (
    <>
      <Heading pt={4} pb={8}>Event details</Heading>
      <Stack
        align={'center'}
        justify={'center'}
        h={'100%'}
        w={'100%'}
      // p={'4'}
      >
        <Card className='event-detail'
          w={{ sm: '100%', md: 'container.md' }}
          h={'fit-content'}
          align={'center'}
          justify={'center'}
          // my={'10%'}
          bgColor={'blackAlpha.900'}
          color={'pink.500'}
          borderRadius={{ base: 0, md: 7.5 }}
          mb={10}
        >
          <Image
            borderTopRadius={'inherit'}
            boxSize={'full'}
            w={{ base: '100%', md: 'container.md' }}
            height={'full'}
            objectFit={'cover'}
            src={event.image}
            alt={`image of ${event.description}`}
            alignItems={'right'}
          />

          <Stack paddingBlock={8}
            // bgColor={'whiteAlpha.50'}
            w={{ base: '100%', md: 'container.md' }}
          >
            <Heading color={'yellow.500'} pb={2} size={'2xl'}>{event.title}</Heading>
            <Text color={'purple.500'} letterSpacing={3} fontWeight={'semibold'} fontSize={'xl'}>{event.description}</Text></Stack>

          <HStack
            bgColor={'whiteAlpha.50'}
            justifyContent={'space-between'}
            w={{ base: '100%', md: 'container.md' }}
            display={{ base: 'block', md: 'flex' }}
            pb={{ base: 16, md: 0 }}
          >

            <Container py={{ base: 16, md: 0 }}
              borderBlock={{ base: '1px', md: 'none' }}
              mb={{ base: 10, md: 'none' }}
            >
              <Stack
                mt={{ base: 0, md: 10 }}
              >
                {/* <Box pt={{ base: 0, md: 8 }} pb={4}>
                <Text fontSize={'xl'} fontWeight={'bold'} letterSpacing={1}>Event details:</Text>
              </Box> */}

                <Box>
                  <Box gap={2} display={'inline-flex'}>
                    <Text verticalAlign={'center'}>Date:</Text>
                    <Text fontSize={'lg'} fontWeight={'semibold'}>{new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text></Box>
                </Box>

                <Box>
                  <Box gap={2} display={'inline-flex'}>
                    <Text verticalAlign={'center'}>Start time:</Text>
                    <Text fontSize={'lg'} fontWeight={'semibold'}>{event.startTime.slice(11, 16)}</Text></Box>
                </Box>

                <Box>
                  <Box gap={2} display={'inline-flex'}>
                    <Text verticalAlign={'center'}>End time:</Text>
                    <Text fontSize={'lg'} fontWeight={'semibold'}>{event.endTime.slice(11, 16)}</Text></Box>
                </Box>

                <Box>
                  <Box gap={2} display={'inline-flex'}>
                    <Text verticalAlign={'center'}>Location:</Text>
                    <Text fontSize={'lg'} fontWeight={'semibold'}>{event.location}</Text></Box>
                </Box>

                <Box>
                  <Box gap={2} display={'inline-flex'}>
                    {
                      event.categoryIds.length > 1
                        ? <Text verticalAlign={'center'}>Categories:</Text>
                        : <Text verticalAlign={'center'}>Category:</Text>
                    }
                    <Text fontSize={'lg'} fontWeight={'semibold'}>
                      {
                        event.categoryIds.map((categoryId) => {
                          return (categories.find((category) => categoryId == category.id)).name
                        }).join(", ")
                      }</Text></Box>
                </Box>
              </Stack>
            </Container>

            <Box backgroundImage={users.find((user) => event.createdBy == user.id).image}
              backgroundSize={'cover'} borderBottomRightRadius={{ base: 0, md: 7.5 }}
              w={'3xs'}
              h={'2xs'}
              boxSize={'2xs'}
              objectFit={'cover'}
            >
              <Box
                display={'inline-flex'}
                gap={4}
                alignSelf={'center'}
                color={'purple.700'}
              >
                <Text>Hosted by:</Text>
                <Text fontWeight={'semibold'}>
                  {users.find((user) => event.createdBy == user.id).name}</Text></Box>
            </Box>
          </HStack>

          {/* <Box
          w={'3xs'}
          display={'inline-flex'}
          gap={4}
          alignSelf={'flex-end'}
        >
          <Text>Hosted by:</Text>
          <Text fontWeight={'semibold'}>
            {users.find((user) => event.createdBy == user.id).name}</Text></Box> */}
        </Card >
      </Stack >
    </>

  );
};

