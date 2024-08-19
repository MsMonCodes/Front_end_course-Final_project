import { React, useState, useRef } from 'react';
import { Box, Heading, Image, Flex, Stack, Text, Card, HStack, Container, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Input, FormLabel, Select, Checkbox, CheckboxGroup, Center, RadioGroup, Radio, color, Switch, InputGroup, SimpleGrid, ButtonGroup, useBreakpointValue, Icon, CheckboxIcon, SelectField } from '@chakra-ui/react';
import { useLoaderData, Link, Form, redirect, useNavigate } from "react-router-dom";
import { SearchBar } from '../components/SearchBar';
import { render } from 'react-dom';
import DefaultImage from "../assets/DefaultImage.jpg";
import LoadingSpinner from "../assets/LoadingSpinner.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EventForm } from '../components/EventForm';
{// import { SearchFn } from '../components/SearchFn';
  // import { AddEventForm } from './AddEvent';
  // import { BreakpointsObject, BreakpointsArray } from '../components/Breakpoints';
  // import { FileUpload, FileUploadTrigger, FileUploadDropzone, FileUploadPreview, } from '@saas-ui/file-upload'

  // link to default image: <Link to="https://www.freepik.com/free-photo/retro-black-camera-arrangement_13360548.htm#from_view=detail_alsolike">Image by freepik</Link>
  // default image: Photo by Tirachard Kumtanom: https://www.pexels.com/photo/black-and-silver-film-camera-on-brown-wooden-surface-733853/
}

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

// export const loader = async ({ params }) => {
//   const events = await fetch(`http://localhost:3000/events/${params.eventId}`);
//   const users = await fetch(`http://localhost:3000/users`);
//   const categories = await fetch(`http://localhost:3000/categories`);

//   return {
//     events: await events.json(),
//     users: await users.json(),
//     categories: await categories.json(),
//   }
// }

export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const body = JSON.stringify({ ...formData, eventId: params.eventId });
  await fetch("http://localhost:3000/events", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  return redirect(`/event/${params.eventId}`);
};

export const EventsListPage = () => {
  window.scrollTo(0, 0);
  const { onOpen } = useDisclosure();
  // const [eventList, setEventList] = useState({});
  // const [inputs, setInputs] = useState({
  //   // createdBy: "",
  //   // title: "",
  //   // description: "",
  //   // image: "../assets/DefaultImage.jpg",
  //   // categoryIds: [],
  //   // location: "",
  //   // startTime: "",
  //   // endTime: ""
  // });

  const { events, users, categories } = useLoaderData();
  // console.log({ events, users, categories });

  // const handleSubmit = async (event) => {
  //   // try {
  //   event.preventDefault();
  //   // setUiState('saving');;
  //   const response = await fetch(
  //     `http://localhost:3000/events/`, {
  //     method: `POST`,
  //     body: JSON.stringify(eventList),
  //     headers: { "Content-Type": "application/json;charset=utf-8" },
  //   })
  //     .then(response => response.json())
  //     // .then(addEvent => render(addEvent))
  //     .then(redirect(`/`));

  //   // if (!response.ok) {
  //   //   alert(`An error occurred: ${error.message}. Please try again.`);
  //   //   throw new Error(`Failed to create new event. Status: ${response.status}`);
  //   // } else {
  //   //   alert('Success! This event has been createed!');
  //   //   // throw new Error(`Failed to create new event. Status: ${response.status}`);
  //   // }

  //   // useNavigate(`http://localhost:3000/events/${event.value}`);
  //   // } catch (error) {
  //   // console.error("An error occurred while creating a new event: ", error);
  //   // }

  //   // return redirect(`/event/:eventId`)
  //   // return redirect(`http://localhost:3000/events/${event.target.value}`);
  // }

  const handleDelete = async (event) => {
    event.preventDefault();
    // let copy = [this.state.events];
    // copy.splice(event, 1);
    // this.setState({ events: copy });
    console.log(event)
    const response = await fetch(
      `http://localhost:3000/events/${event.target.value}`, {
      method: `DELETE`,
    });

    if (!response.ok) {
      alert(`An error occurred: ${error.message}. Please try again.`);
    } else {
      alert('Success! The event has been deleted!');
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

  // const [defaultEventImage, setDefaultEventImage] = useState(DefaultImage);
  // const fileUploadRef = useRef(null);
  // const handleUploadImage = (event) => {
  //   event.preventDefault();
  //   fileUploadRef.current.click();
  // }
  // const imagePreview = () => {
  //   setDefaultEventImage(LoadingSpinner);
  //   // <LoadingSpinner size={'xs'} bgColor={'none'} bgSize={'full'} />
  //   const uploadedFile = fileUploadRef.current.files[0];
  //   // const cachedURL = URL.createObjectURL(uploadedFile);
  //   // setDefaultEventImage(cachedURL);      
  //   setDefaultEventImage(URL.createObjectURL(uploadedFile));

  //   // const formData = new FormData();
  //   // formData.append("file", uploadedFile);

  //   // const response = await fetch(`http://localhost:3000/events/`, {
  //   //   method: `POST`,
  //   //   body: formData
  //   // });

  //   // if (response.status === 201) {
  //   //   const data = await response.json();
  //   //   setDefaultEventImage("");
  //   // }

  //   // setDefaultEventImage(DefaultImage);

  // }

  return (
    <>
      <Stack className='event-list' w={'100%'} h={'100%'} align={'center'}>
        <Stack pb={{ base: 6, md: 10 }} gap={4} w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} align={'center'}>
          <Heading py={4} pb={{ base: 4, md: 8 }}>Upcoming events</Heading>
          <HStack w={'100%'} display={'flex'} justifyContent={'flex-end'}
          >
            <SearchBar barWidth={'fit-content'}
            />
            <EventForm onClick={onOpen} />

            {/* <Button type={'button'} bgColor={'whiteAlpha.400'} minW={{ base: 'fit-content', md: '0px' }}
              // minW={{ base: 'fit-content', md: '0px' }} 
              justifyContent={'right'} onClick={onOpen} visibility={{ base: 'visible', sm: 'visible', md: 'hidden' }} >+</Button>
            <Button visibility={{ base: 'hidden', sm: 'hidden', md: 'visible' }} type={'button'} bgColor={'whiteAlpha.400'} minW={{ base: '0px', md: 'fit-content' }}
              // minW={{ base: '0px', md: 'fit-content' }} 
              justifyContent={'right'} onClick={onOpen} >Create new</Button> */}

          </HStack>
          <Stack gap={4} w={'inherit'}>
            {events.map((event) => (
              <Card key={event.id} className='event'
                h={'xs'}
                align={{ md: 'center' }}
                justifyContent={'space-between'}
                borderRadius={{ base: 0, md: 7.5 }}
                bgColor={'blackAlpha.900'}
                color={'purple.400'}
                _hover={{
                  marginLeft: -2,
                  color: "pink.500",
                  borderColor: "yellow.500",
                  borderInlineStartWidth: 8,
                }}>
                <Link to={`event/${event.id}`}>
                  <HStack
                    w={{ base: '100%', md: 'container.sm', lg: 'container.md' }}
                    h={'xs'}
                    justify={{ base: 'flex-start', md: 'space-between' }}
                  >
                    <Container
                      w={{ base: '50vw', md: 'inherit' }}>
                      <Stack pb={{ base: 1, md: 8 }}>
                        <Heading pb={4} size={'lg'} >{event.title}</Heading>
                        <Text letterSpacing={3} fontWeight={'semibold'} fontSize={{ base: 'md', md: 'lg' }}>{event.description}</Text></Stack>

                      <Stack justifyContent={'space-around'} rowGap={{ base: 0, md: 2 }}>
                        <Box >

                          {event.startTime.slice(0, 10) === event.endTime.slice(0, 10)
                            ? (<Box><Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                              {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}</Text>
                              <Box gap={1} display={'inline-flex'}>
                                <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.startTime.slice(11, 16)}</Text>
                                - <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.endTime.slice(11, 16)}</Text></Box></Box>
                            ) : (
                              <Box gap={1} display={'flex'} flexDir={'column'}>
                                <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                                  {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3, 10)}  -  {new Date(event.endTime).toDateString().slice(0, 3)}, {new Date(event.endTime).toDateString().slice(3)}</Text></Box>
                            )
                          }

                          {/* <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>
                            {new Date(event.startTime).toDateString().slice(0, 3)}, {new Date(event.startTime).toDateString().slice(3)}
                          </Text>

                          <Box gap={1} display={'inline-flex'}>
                            <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.startTime.slice(11, 16)}</Text>
                            - <Text fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'inherit' }}>{event.endTime.slice(11, 16)}</Text></Box> */}

                        </Box>

                        <Box justifyContent={'space-between'}>
                          <Flex gap={{ sm: 0, md: 2 }} display={'flow'}>
                            {
                              event.categoryIds.length > 1
                                ? <Text fontSize={{ base: 'sm', md: 'inherit' }}>Event categories:</Text>
                                : <Text fontSize={{ base: 'sm', md: 'inherit' }}>Event category:</Text>
                            }
                            <Box>{
                              event.categoryIds.map((categoryId) => {
                                return (categories.find((category) => categoryId == category.id))?.name
                              }).join(", ")}</Box></Flex></Box></Stack>
                    </Container>

                    {/* <Box
                      // w={'50hw'}
                      w={{ base: '50vw', md: 'inherit' }}>
                      <Image
                        // w={{ base: 'xs', md: 'lg' }}
                        h={'xs'}
                        justifyContent={'right'}
                        borderRightRadius={{ base: 0, md: 7.5 }}
                        objectFit={'cover'}
                        src={event.image}
                        alt={`image of ${event.description}`} />
                    </Box> */}
                    <Flex bgImg={event.image ? event.image : DefaultImage} bgSize={'cover'} w={{ base: 'xs', md: 'lg' }}
                      h={'xs'} justifyContent={'right'} borderRightRadius={{ base: 0, md: 7.5 }}>
                      <Button fontSize={{ base: 'xl', md: '2xl' }} justifyContent={'end'} bg={'none'} color={'pink.500'} method={"delete"} onClick={handleDelete} value={event.id}
                      // onClick={() => this.props.handleDelete(this.props.id)}
                      >x</Button>
                    </Flex>
                  </HStack>
                </Link>
              </Card >

            ))}</Stack>
        </Stack >
      </Stack >
    </>
  );
};