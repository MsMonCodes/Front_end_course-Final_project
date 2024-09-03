import { Button, FormLabel, Input, Select, Box, Image, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Switch, InputGroup, Textarea, Checkbox, SelectField, CheckboxGroup, Toast, useToast, FormHelperText, Icon } from "@chakra-ui/react";
import { React, useState, useRef, isValidElement } from 'react';
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventsListPage";
// import { loader } from "../pages/EventDetailsPage";

import DefaultImage from "../assets/DefaultImage.jpg";
import LoadingSpinner from "../assets/LoadingSpinner.gif";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FormEditEvent = (
    // { fetchEvents, ButtonText, submitMethod, formMethod }
) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { event, users, categories } = useLoaderData(loader);
    const [inputs, setInputs] = useState({
        createdBy: event.createdBy,
        title: event.title,
        description: event.description,
        image: event.image,
        categoryIds: event.categoryIds,
        location: event.location,
        startTime: event.startTime.slice(0, 16),
        endTime: event.endTime.slice(0, 16),
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
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'categoryIds') {
            let catIds = inputs.categoryIds;
            if (event.target.checked) {
                catIds.push(Number(value));
            }
            else {
                catIds = catIds.filter((id) => id !== Number(value));
            }
            setInputs(values => ({ ...values, [name]: catIds.sort() }))
        }
        else {
            setInputs(values => ({ ...values, [name]: value }))
        }
        // fetchEvents();
        // navigate(`/`);
    }

    // const handleSubmit = async () => {
    //     // e.preventDefault();
    //     // try {
    //     const response = await fetch(
    //         `http://localhost:3000/events/${event.id}`, {
    //         method: `PUT`,
    //         body: JSON.stringify(inputs),
    //         headers: { "Content-Type": "application/json;charset=utf-8" },
    //     })
    //         .then(response => response.json())
    //         // .then((response) => {
    //         // this.toast.show({ timeOut: 4000 })
    //         // .then(toast.fadeout(4000))
    //         .catch((error) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not okay.');
    //             }
    //             return response.json()
    //         })
    //         // })
    //         // } catch (error) {
    //         //     console.error(`Error updating event.`);
    //         //     toast({
    //         //         title: 'CATCH ERROR: Error',
    //         //         description: 'There was an error while creating the event.',
    //         //         status: 'error',
    //         //         duration: 5000,
    //         //         isClosable: true,
    //         //     })
    //         // }

    //         .then(await fetch(event))
    //         .then(onClose())
    //         .then(navigate(`./`))
    //         .then(toast({
    //             title: 'Success!',
    //             description: 'Your new event has been edited.',
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //         }));
    // }


    return (
        <>
            <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'}
                _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }}
                onClick={onOpen}>Edit</Button>
            {/* <Icon type={'button'} h={10} w={5} _hover={{ color: 'white', cursor: 'pointer' }}
                onClick={onOpen}>{ButtonText}</Icon> */}

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={'blackAlpha.500'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'} >
                    <ModalHeader>Add your event details</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <Form
                            // onSubmit={handleSubmit}
                            id={'edit-event-form'}
                            method={"put"}
                        // method={"post"}
                        >
                            {/* <FormControl isInvalid={catValidation()}> */}
                            <FormControl pb={3}><FormLabel>Who is the host of this event?</FormLabel>
                                <Select required={true} placeholder='Select a registered host'
                                    onChange={handleChange} value={inputs.createdBy} name='createdBy'>
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the name of your event</FormLabel>
                                <Input required={true} name='title'
                                    onChange={handleChange}
                                    value={inputs.title || ""}
                                    type='text' placeholder='...' /></FormControl>

                            <FormControl pb={3}><FormLabel>Type your event description here</FormLabel>
                                <Input required={true} name={'description'}
                                    onChange={handleChange}
                                    value={inputs.description || ""}
                                    type='text' placeholder='...' /></FormControl>

                            <FormControl pb={3}><FormLabel>Upload your event image:
                                {/* <FormHelperText display={'inline'} pl={2} fontWeight={'hairline'}
                                    // verticalAlign={'center'} fontSize={'sm'} fontStyle={'italic'} color={'blackAlpha.700'}
                                    >Click to upload an image</FormHelperText>*/}</FormLabel>
                                {/* <Form id={'form'} encType='multipart/form-data' > */}
                                <Textarea aria-label="image" rows="1" name="image" required={true}
                                    onChange={handleChange} value={inputs.image || ""}
                                    placeholder={'Paste the image URL here.'}></Textarea>
                            </FormControl>

                            <FormControl pb={3}>
                                <FormLabel>What category does your event fall under?</FormLabel>
                                <InputGroup display={'flex'} flexDir={'column'} name='categoryIds' value={inputs.categoryIds || ""}>{categories.map((category) => (
                                    <Checkbox colorScheme={'yellow'} pb={2} size={'sm'} name='categoryIds' key={category.id}
                                        onChange={handleChange} value={category.id}>{category.name}</Checkbox>
                                ))} </InputGroup></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the location of your event</FormLabel>
                                <Input required={true} type={'text'}
                                    name='location' onChange={handleChange} value={inputs.location || ""} /></FormControl>

                            <FormControl pb={3}><FormLabel>Select the start date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'}
                                    name='startTime' onChange={handleChange} value={inputs.startTime || ""} /></FormControl>

                            <FormControl pb={3}><FormLabel>Select the end date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'}
                                    name='endTime' onChange={handleChange} value={inputs.endTime || ""} /></FormControl>

                            <Flex pt={4} my={4} justify={'flex-end'}>
                                <Button colorScheme='yellow' mr={3} type={'submit'} method={"put"}
                                // onClick={() => onClose}
                                >Save & View</Button>
                                <Button onClick={() => onClose}
                                    //  onClick={() => !value ? error("All fields are required") : onClose}
                                    color={'blackAlpha'} colorScheme={'whiteAlpha'}>Cancel</Button></Flex>
                            {/* </FormControl> */}
                        </Form></ModalBody>
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
