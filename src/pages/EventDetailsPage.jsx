import React from 'react';
import { Card, Image, Heading, Text, Box, Flex, Container, Stack, StackItem, SimpleGrid, ControlBox, Grid, GridItem, HStack } from '@chakra-ui/react';
import { useLoaderData, Link } from "react-router-dom";

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

export const EventDetailsPage = () => {
  const { event, users, categories } = useLoaderData();

  return (
    <Stack
      align={'center'}
      justify={'center'}>
      <Card className='event-detail'
        w={'container.md'}
        h={'fit-content'}
        align={'center'}
        justify={'center'}
        my={4}
        bgColor={'blackAlpha.900'}
        color={'pink.500'}
      >
        <Image
          borderTopRadius={'inherit'}
          boxSize='full'
          height={'full'}
          objectFit={'cover'}
          src={event.image}
          alt={`image of ${event.description}`}
          alignItems={'right'}
        />

        <Stack paddingBlock={8}
          // bgColor={'whiteAlpha.50'}
          w={'container.md'}
        >
          <Heading color={'yellow.500'} pb={2} size={'2xl'}>{event.title}</Heading>
          <Text color={'purple.500'} letterSpacing={3} fontWeight={'semibold'} fontSize={'xl'}>{event.description}</Text></Stack>

        <HStack
          bgColor={'whiteAlpha.50'}
          py={10}
          // pr={8}
          // gap={8}
          justifyContent={'space-evenly'}
          w={'container.md'}
        // px={8}
        >

          <Box>
            <Stack>
              <Box>
                <Box gap={2} display={'inline-flex'}>
                  <Text alignSelf={'center'}>Date:</Text>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>{new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text></Box>
              </Box>

              <Box>
                <Box gap={2} display={'inline-flex'}>
                  <Text alignSelf={'center'}>Start time:</Text>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>{event.startTime.slice(11, 16)}</Text></Box>
              </Box>

              <Box>
                <Box gap={2} display={'inline-flex'}>
                  <Text alignSelf={'center'}>End time:</Text>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>{event.endTime.slice(11, 16)}</Text></Box>
              </Box>

              <Box>
                <Box gap={2} display={'inline-flex'}>
                  <Text alignSelf={'center'}>Location:</Text>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>{event.location}</Text></Box>
              </Box>

              <Box>
                <Box gap={2} display={'inline-flex'}>
                  {
                    event.categoryIds.length > 1
                      ? <Text alignSelf={'center'}>Categories:</Text>
                      : <Text alignSelf={'center'}>Category:</Text>
                  }
                  <Text fontSize={'lg'} fontWeight={'semibold'}>
                    {
                      event.categoryIds.map((categoryId) => {
                        return (categories.find((category) => categoryId == category.id)).name
                      }).join(", ")
                    }</Text></Box>
              </Box>
            </Stack>
          </Box>


          <Stack
            // align={'center'}
            // justifyContent={'space-between'}
            w={'3xs'}
          // h={'full'}
          >
            <Image
              boxSize={'2xs'}
              w={'full'}
              h={'full'}
              objectFit={'cover'}
              src={users.find((user) => event.createdBy == user.id).image}
            // alignItems={'right'}
            />

            <Text fontSize={'lg'} fontWeight={'semibold'}>
              {users.find((user) => event.createdBy == user.id).name}</Text>

            {/* <Flex flexDir={'column'} >
              <Text fontSize={'xs'}>View more events hosted by:</Text>
              <Box _hover={{ color: "yellow.300" }} >
                <Link to={`user / ${event.createdBy}`}>{users.find((user) => event.createdBy == user.id).name}</Link></Box></Flex> */}
          </Stack >

        </HStack>
      </Card >
    </Stack >
  );
};

