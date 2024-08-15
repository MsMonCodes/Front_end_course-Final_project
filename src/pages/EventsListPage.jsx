import { React, useState, useRef } from 'react';
import { Box, Heading, Image, Flex, Stack, Text, Card, HStack, Container, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Input, FormLabel, Select, Checkbox, CheckboxGroup, Center, RadioGroup, Radio, color, Switch, InputGroup, SimpleGrid, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import { useLoaderData, Link, Form, redirect, useNavigate } from "react-router-dom";
import { SearchBar } from '../components/SearchBar';
import { render } from 'react-dom';
import DefaultImage from "../assets/DefaultImage.jpg";
import LoadingSpinner from "../assets/LoadingSpinner.gif";
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

// export const action = async ({ request }) => {
//   const data = await request.formData()
//   console.log(`ACTION LOGGED:  ${request}`);

//   const submission = {
//     createdBy: data.get('hostName'),
//     title: data.get('eventName'),
//     description: data.get('eventDescription'),
//     image: data.get('eventImage'),
//     categoryIds: data.get(['eventCategory']),
//     location: data.get('eventLocation'),
//     startTime: data.get('eventStart'),
//     endTime: data.get('eventEnd'),
//   }
//   console.log(`SUBMISSION LOGGED:  ${submission}`)

//   //send post request
//   const response = await fetch(
//     `http://localhost:3000/events`, {
//     method: `PUT`,
//     body: JSON.stringify({ submission }),
//     headers: { "Content-Type": "application/json;charset=utf-8" },
//   }
//   );
//   console.log(`SUBMISSION LOGGED:  ${response}`)

//   //redirect the user
//   return redirect('/')
// }

// export const action = async ({ request, params }) => {
//   switch (request.method) {
//     case "POST": {
//       let formData = await request.formData.json();
//       let createdBy = formData.get('hostName');
//       let title = formData.get('eventName');
//       let description = formData.get('eventDescription');
//       let image = formData.get('eventImage');
//       let categoryIds = formData.get(['eventCategory']);
//       let location = formData.get('eventLocation');
//       let startTime = formData.get("eventStart");
//       let endTime = formData.get("eventEnd");

//       return await fetch(
//         console.log(request)
//           `http://localhost:3000/events/`, {
//         method: `POST`,
//         body: JSON.stringify({ formData }),
//         headers: { "Content-Type": "application/json;charset=utf-8" },
//       }
//       );

//     }
//     case "PUT": {
//       let formData = await request;
//       // let createdBy = formData.get('hostName');
//       // let title = formData.get('eventName');
//       // let description = formData.get('eventDescription');
//       // let image = formData.get('eventImage');
//       // let categoryIds = formData.get(['eventCategory']);
//       // let location = formData.get('eventLocation');
//       // let startTime = formData.get("eventStart");
//       // let endTime = formData.get("eventEnd");

//       return await fetch(
//         `http://localhost:3000/events/`, {
//         method: `PUT`,
//         body: JSON.stringify({ formData }),
//         headers: { "Content-Type": "application/json;charset=utf-8" },
//       }
//       );
//     }
//     case "DELETE": {
//       return events(params.id);
//     }
//     default: {
//       throw new Response("", { status: 405 });
//     }
//   }
// }

export const EventsListPage = () => {
  window.scrollTo(0, 0);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'categoryIds') {
      if (!inputs.categoryIds) {
        inputs.categoryIds = []
      }
      if (event.target.checked) {
        inputs.categoryIds.push(Number(value));
      } else {
        inputs.categoryIds.splice(Number(value));
      }
    }
    else {
      setInputs(values => ({ ...values, [name]: value }))
    }

  }

  const handleSubmit = async (event) => {
    // try {
    event.preventDefault();
    // setUiState('saving');;
    const response = await fetch(
      `http://localhost:3000/events/`, {
      method: `POST`,
      body: JSON.stringify(inputs),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then(response => response.json())
      .then(addEvent => (addEvent))

    if (!response.ok) {
      alert(`An error occurred: ${error.message}. Please try again.`);
      throw new Error(`Failed to create new event. Status: ${response.status}`);
    } else {
      alert('Success! This event has been createed!');
      // throw new Error(`Failed to create new event. Status: ${response.status}`);
    }

    // useNavigate(`http://localhost:3000/events/${event.value}`);
    // } catch (error) {
    // console.error("An error occurred while creating a new event: ", error);
    // }

    return redirect(`/event/:eventId`)
    // return redirect(`http://localhost:3000/events/${event.target.value}`);
  }

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { events, users, categories } = useLoaderData();
  // console.log({ events, users, categories });

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  const [defaultEventImage, setDefaultEventImage] = useState(DefaultImage);
  const fileUploadRef = useRef(null);
  const handleUploadImage = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }
  const imagePreview = async () => {
    try {
      setDefaultEventImage(LoadingSpinner);
      // <LoadingSpinner size={'xs'} bgColor={'none'} bgSize={'full'} />
      const uploadedFile = fileUploadRef.current.files[0];
      // const cachedURL = URL.createObjectURL(uploadedFile);
      // setDefaultEventImage(cachedURL);      
      setDefaultEventImage(URL.createObjectURL(uploadedFile));

      // const formData = new FormData();
      // formData.append("file", uploadedFile);

      // const response = await fetch(`http://localhost:3000/events/`, {
      //   method: `POST`,
      //   body: formData
      // });

      // if (response.status === 201) {
      //   const data = await response.json();
      //   setDefaultEventImage("");
      // }

    } catch (error) {
      console.error(error);
      setDefaultEventImage(DefaultImage);
    }
  }

  return (
    <>
      <Stack className='event-list' w={'100%'} h={'100%'} align={'center'}>
        <Stack pb={{ base: 6, md: 10 }} gap={4} w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} align={'center'}>
          <Heading py={4} pb={{ base: 4, md: 8 }}>Upcoming events</Heading>
          <HStack w={'100%'} display={'flex'} justifyContent={'flex-end'}
          >
            <SearchBar barWidth={'fit-content'}
            />
            <Button type={'button'} bgColor={'whiteAlpha.400'} minW={{ base: 'fit-content', md: '0px' }} justifyContent={'right'} onClick={onOpen}>+</Button>

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
                        {/* <Link to={`event/${event.id}`}> */}
                        <Heading pb={4} size={'lg'} >{event.title}</Heading>
                        {/* </Link> */}
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
                                return (categories.find((category) => categoryId == category.id)).name
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
                    <Flex bgImg={event.image} bgSize={'cover'} w={{ base: 'xs', md: 'lg' }}
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
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen}>
          <ModalOverlay bg={'blackAlpha.500'} backdropFilter={'auto'} backdropBlur='8px' />
          <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'} >
            <ModalHeader>Add your event details</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Form onSubmit={handleSubmit} method={"post"}>
                <FormControl>
                  <Box pb={3}>
                    <FormLabel>Who is the host of this event?</FormLabel>
                    <Select
                      value={inputs.createdBy} onChange={handleChange} name='CreatedBy'
                      required={true}
                      placeholder='Select a registered host'>
                      {users.map((user) => (
                        <option value={user.id} key={user.id}>{user.name}</option>
                      ))} </Select></Box>

                  <Box pb={3}>
                    <FormLabel>Enter the name of your event</FormLabel>
                    <Input
                      required={true}
                      name='title' value={inputs.title || ""} onChange={handleChange} type='text' placeholder='...' /></Box>

                  <Box pb={3}>
                    <FormLabel>Type your event description here</FormLabel>
                    <Input
                      required={true}
                      name='description' value={inputs.description || ""} onChange={handleChange} type='text' placeholder='...' /></Box>

                  <Box pb={3}>
                    <FormLabel>Upload your event image:
                      <Text display={'inline'} verticalAlign={'center'} fontSize={'sm'} fontStyle={'italic'}
                        color={'blackAlpha.700'} pl={2}>Click to upload an image</Text></FormLabel>
                    {/* <Form id={'form'} encType='multipart/form-data' > */}
                    <Button
                      // _hover={'none'} 
                      bgImage={defaultEventImage} bgSize={'cover'} bgPos={'center'} h={'xs'}
                      w={'xs'} type={'submit'} onClick={handleUploadImage} />
                    <Input type={'file'} id={'file'} ref={fileUploadRef}
                      // value={inputs.image} 
                      onChange={imagePreview} hidden />

                    {/* <FileUpload maxFileSize={1024 * 1024} maxFiles={1} accept="image/">
                          {({ acceptedFiles, deleteFile }) => (
                            <FileUploadDropzone>
                              {!acceptedFiles?.length ? (
                                <>
                                  <Text fontSize={'sm'}>Drag your image here</Text>
                                  <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
                                </>
                              ) : (
                                <HStack>
                                  <FileUploadPreview file={acceptedFiles[0]} w={'200px'} />
                                  <Button onClick={(e) => {
                                    e.stopPropagation()
                                    deleteFile(acceptedFiles[0])
                                  }}
                                  >Remove</Button>
                                </HStack>
                              )}
                            </FileUploadDropzone>
                          )}
                        </FileUpload> */}
                    {/* <Input required={false} ref={initialRef} type={'image'} name='image'
                          value={inputs.image || ""} onChange={handleChange} /> */}
                  </Box>

                  <Box pb={3}>
                    <FormLabel>What category does your event fall under?</FormLabel>
                    <InputGroup display={'flex'} flexDir={'column'} required={true} name='categoryIds'
                      value={inputs.categoryIds || ""}
                    >
                      {categories.map((category) => (
                        <Switch colorScheme={'yellow'} pb={2} size={'sm'} name='categoryIds'
                          value={category.id}
                          key={category.id}
                          onChange={handleChange}
                        > {category.name}</Switch>
                      ))} </InputGroup></Box>

                  <Box pb={3}>
                    <FormLabel>Enter the location of your event</FormLabel>
                    <Input
                      //  required={true} 
                      name='location' value={inputs.location || ""} onChange={handleChange} type={'text'} /></Box>

                  <Box pb={3}>
                    <FormLabel>Select the start date and time of your event</FormLabel>
                    <Input
                      // required={true}
                      name='startTime' value={inputs.startTime || ""} onChange={handleChange} type={'datetime-local'} /></Box>

                  <Box pb={3}>
                    <FormLabel>Select the end date and time of your event</FormLabel>
                    <Input
                      // required={true} 
                      name='endTime' value={inputs.endTime || ""} onChange={handleChange} type={'datetime-local'} /></Box>

                  <Flex pt={4} my={4} justify={'flex-end'} >
                    <Button colorScheme='yellow' mr={3} type={'submit'}
                      method={'post'}
                      onSubmit={handleSubmit}
                    >Save & View</Button>
                    <Button onClick={onClose} color={'blackAlpha'} colorScheme={'whiteAlpha'}>Cancel</Button></Flex>
                </FormControl></Form></ModalBody>
            {/* <ModalFooter>
                <Button colorScheme='pink' mr={3} type={'submit'}
                // onSubmit={handleSubmit}
                >Save</Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter> */}
          </ModalContent></Modal >
      </Stack >
    </>
  );
};