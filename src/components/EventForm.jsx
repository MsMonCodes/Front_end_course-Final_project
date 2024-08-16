import { Button, FormLabel, Input, Select, Box, Image, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Switch, InputGroup } from "@chakra-ui/react";
import { React, useState, useRef } from 'react';
import { Form, redirect, useLoaderData } from "react-router-dom";
import { loader } from "../pages/EventsListPage";

import DefaultImage from "../assets/DefaultImage.jpg";
import LoadingSpinner from "../assets/LoadingSpinner.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const EventForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users, categories } = useLoaderData(loader);
    const [inputs, setInputs] = useState({
        // createdBy: "",
        // title: "",
        // description: "",
        // image: "../assets/DefaultImage.jpg",
        // categoryIds: [],
        // location: "",
        // startTime: "",
        // endTime: ""
    });
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const breakpoints = {
        base: '0em',
        sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
        md: '48em', // ~768px
        lg: '62em', // ~992px
        xl: '80em', // ~1280px
        '2xl': '96em', // ~1536px
    }

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
            // inputs.categoryIds.sort([value])
        }
        else {
            setInputs(values => ({ ...values, [name]: value }))
        }
        // event = inputs;
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
            // .then(addEvent => render(addEvent))
            .then(redirect(`/`));

        // if (!response.ok) {
        //   alert(`An error occurred: ${error.message}. Please try again.`);
        //   throw new Error(`Failed to create new event. Status: ${response.status}`);
        // } else {
        //   alert('Success! This event has been createed!');
        //   // throw new Error(`Failed to create new event. Status: ${response.status}`);
        // }

        // useNavigate(`http://localhost:3000/events/${event.value}`);
        // } catch (error) {
        // console.error("An error occurred while creating a new event: ", error);
        // }

        // return redirect(`/event/:eventId`)
        // return redirect(`http://localhost:3000/events/${event.target.value}`);
    }




    const [defaultEventImage, setDefaultEventImage] = useState(DefaultImage);
    const fileUploadRef = useRef(null);
    const handleUploadImage = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }
    const imagePreview = () => {
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

        // setDefaultEventImage(DefaultImage);

    }

    return (
        <>
            <Button type={'button'} bgColor={'whiteAlpha.400'} minW={{ base: 'fit-content', md: '0px' }} justifyContent={'right'} onClick={onOpen} >+</Button>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                                        value={inputs.createdBy} onChange={handleChange} name='createdBy'
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
                                    {/* <Icon><FontAwesomeIcon icon="fa-solid fa-image" />
          </Icon> */}
                                    <Box bgImage={defaultEventImage} bgSize={'cover'} bgPos={'center'} h={'xs'}
                                        w={'xs'} type={'submit'} onClick={handleUploadImage} rounded={'lg'} />
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
                                        onChange={handleChange}
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
        </>
    );
} 
