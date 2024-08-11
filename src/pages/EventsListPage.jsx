import { React, useState, useRef } from 'react';
import { Box, Heading, Image, Flex, Stack, Text, Card, HStack, Container, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Input, FormLabel, Select } from '@chakra-ui/react';
import { useLoaderData, Link, Form, redirect } from "react-router-dom";
// import { AddEventForm } from './AddEvent';
// import { BreakpointsObject, BreakpointsArray } from '../components/Breakpoints';

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



// export const actionExample = async ({ request }) => {

//   const data = await request.formData()
//   console.log(request);

//   const submission = {
//     // events.push({
//     image: data.get('eventImage'),
//     title: data.get('eventName'),
//     description: data.get('eventDescription'),
//     startTime: data.get('eventStart'),
//     eventEnd: data.get('eventEnd'),
//     location: data.get('eventLocation'),
//     // })

//     // categories.
//     Cname: data.get('eventCategory'),

//     // users.
//     Uimage: data.get('hostImage'),
//     Uname: data.get('hostName')
//   }
//   console.log(submission)

//   //send post request

//   //redirect the user
//   return redirect('/')
// }

export const actionsfd = async (event) => {
  const response = await fetch(
    `http://localhost:3000/events/`, {
    method: `POST`,
    body: JSON.stringify({ event }),
    headers: { "Content-Type": "application/json;charset=utf-8" },
  }
  );
}

export const action = async ({ request }) => {
  const data = await request.formData()
  console.log(request);

  const submission = {
    image: data.get('eventImage'),
    title: data.get('eventName'),
    description: data.get('eventDescription'),
    startTime: data.get('eventStart'),
    eventEnd: data.get('eventEnd'),
    location: data.get('eventLocation'),

    // categories.
    Cname: data.get('eventCategory'),

    // users.
    Uname: data.get('hostName')
  }
  console.log(submission)

  //send post request
  // const response = await fetch(
  //   `http://localhost:3000/events`, {
  //   method: `PUT`,
  //   body: JSON.stringify({ submission }),
  //   headers: { "Content-Type": "application/json;charset=utf-8" },
  // }
  // );

  //redirect the user
  return redirect('/')
}



export const EventsListPage = () => {


  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }


  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { events,
    users,
    categories } = useLoaderData();
  // console.log({ events, users, categories });

  const CreateEventFn = async (event) => {
    const response = await fetch(
      `http://localhost:3000/events/`, {
      method: `POST`,
      body: JSON.stringify({ event }),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    }
    );
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   createEvent({ content });
  //   setContent('');
  // }


  // function InitialFocus() {
  //   const { isOpen, onOpen, onClose } = useDisclosure()

  //   const initialRef = useRef(null)
  //   const finalRef = useRef(null)

  //   return (
  //     <>
  //       <Button onClick={onOpen}>Open Modal</Button>
  //       <Button ml={4} ref={finalRef}>
  //         I'll receive focus on close
  //       </Button>

  //       <Modal
  //         initialFocusRef={initialRef}
  //         finalFocusRef={finalRef}
  //         isOpen={isOpen}
  //         onClose={onClose}
  //       >
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Create your account</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody pb={6}>
  //             <FormControl>
  //               <FormLabel>First name</FormLabel>
  //               <Input ref={initialRef} placeholder='First name' />
  //             </FormControl>

  //             <FormControl mt={4}>
  //               <FormLabel>Last name</FormLabel>
  //               <Input placeholder='Last name' />
  //             </FormControl>
  //           </ModalBody>

  //           <ModalFooter>
  //             <Button colorScheme='blue' mr={3}>
  //               Save
  //             </Button>
  //             <Button onClick={onClose}>Cancel</Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     </>
  //   )
  // }

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
        <HStack>
          <Heading py={4}>Upcoming events</Heading>
          <Button type={'button'} onClick={onOpen}>+</Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>

              <ModalHeader>Add your event details</ModalHeader>

              <ModalCloseButton />

              <ModalBody pb={6}>
                <Form onSubmit={handleSubmit}>
                  <FormLabel>Who is the host of this event?</FormLabel>
                  <Select required={true} name='categoryIds'>
                    {users.map((user) => (
                      <option value={user.id} key={user.id}>{user.name}</option>
                    ))} </Select>

                  <FormLabel>Enter the name of your event</FormLabel>
                  <Input required={true} name='title' value={inputs.title || ""} onChange={handleChange} type='text' placeholder='...' />

                  <FormLabel>Type your event description here</FormLabel>
                  <Input required={true} name='description' value={inputs.description || ""} onChange={handleChange} type='text' placeholder='...' />

                  {/* <FormLabel>Upload your event image</FormLabel>
          <Input required={false} ref={initialRef} type={'image'} name='image'  value={inputs.image || ""} onChange={handleChange}/> */}

                  <FormLabel>What category does your event fall under?</FormLabel>
                  <Select required={true} name='categoryIds' value={inputs.categoryIds || ""} onChange={handleChange}>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>{category.name}</option>
                    ))} </Select>

                  <FormLabel>Enter the location of your event</FormLabel>
                  <Input required={true} name='location' value={inputs.location || ""} onChange={handleChange} type={'text'} />

                  <FormLabel>Select the start date and time of your event</FormLabel>
                  <Input required={true} name='startTime' value={inputs.startTime || ""} onChange={handleChange} type={'datetime-local'} />

                  <FormLabel>Select the end date and time of your event</FormLabel>
                  <Input required={true} name='endTime' value={inputs.endTime || ""} onChange={handleChange} type={'datetime-local'} />

                  <Box>
                    <Button colorScheme='pink' mr={3} type={'submit'}
                    // onSubmit={handleSubmit}
                    >Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Box>

                </Form>

              </ModalBody>

              <ModalFooter>
                {/* <Button colorScheme='pink' mr={3} type={'submit'}
                // onSubmit={handleSubmit}
                >Save</Button>
                <Button onClick={onClose}>Cancel</Button> */}
              </ModalFooter>

            </ModalContent>
          </Modal>
        </HStack>

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
              bgColor={'blackAlpha.900'}
              color={'purple.400'}
              _hover={{
                color: "pink.500",
                borderColor: "yellow.500",
                borderInlineStartWidth: 6,

                // paddingInlineStart: -16,
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
                      <Heading pb={4} size={'lg'} >{event.title}</Heading>
                      {/* </Link> */}
                      <Text letterSpacing={3} fontWeight={'semibold'} fontSize={{ base: 'md', md: 'lg' }}>{event.description}</Text></Stack>

                    <Stack justifyContent={'space-around'} rowGap={{ base: 0, md: 2 }}>
                      <Box >
                        <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                        <Box gap={1} display={'inline-flex'}>
                          <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.startTime.slice(11, 16)}</Text>
                          - <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                      <Box justifyContent={'space-between'}>
                        <Flex gap={{ sm: 0, md: 2 }} display={'flow'}>
                          {
                            event.categoryIds.length > 1
                              ? <Text fontSize={{ base: 'sm', md: 'inherit' }}>Event categories:</Text>
                              : <Text fontSize={{ base: 'sm', md: 'inherit' }}>Event category:</Text>
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