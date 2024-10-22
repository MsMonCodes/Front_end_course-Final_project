import { Button, FormLabel, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Textarea, useToast, Stack } from "@chakra-ui/react";
import { React, useState, useRef } from 'react';
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventDetailsPage";
import { serverURL } from "./serverURL";

export const actionEditEvent = async ({ request, params }) => {
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData);
    const catIds = formData.getAll("categoryIds[]").map(catId => Number(catId));
    delete formObj["categoryIds[]"];
    const body = JSON.stringify({
        id: params.eventId,
        categoryIds: catIds,
        ...formObj
    });
    return await fetch(`${serverURL}/events/${params.eventId}`, {
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
    })
        .then(redirect('./'))
        .then(alert('Success! This event has been edited.'));
};

export const FormEditEvent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { event, users, categories } = useLoaderData(loader);
    const toast = useToast();
    const navigate = useNavigate();
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

    const initialInputs = ({
        createdBy: event.createdBy,
        title: event.title,
        description: event.description,
        paragraph: event.paragraph,
        image: event.image,
        categoryIds: event.categoryIds,
        location: event.location,
        startTime: event.startTime.slice(0, 16),
        endTime: event.endTime.slice(0, 16),
    });
    const [inputs, setInputs] = useState({ ...initialInputs });

    const handleCheckedCategories = (event) => {
        const catIds = Array.from(event.target.selectedOptions).map(o => Number(o.value));
        setInputs(values => ({ ...values, categoryIds: catIds.sort() }));
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async () => {
        const actionData = useActionData();
        response => {
            if (!response.ok) {
                throw new Error('Network response was not okay.');
            }
            return response.json()
        };
        try {
            await fetch(actionData)
        } catch {
            (error) => {
                toast({
                    title: 'Error',
                    description: 'There was an error while editing this event.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                }).then(console.error(error));
            }
        }
    }

    return (
        <div className="edit-event-form">
            <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'} _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }} onClick={onOpen}>
                Edit</Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'lg' }}>
                <ModalOverlay bg={'blackAlpha.600'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'}>
                    <ModalHeader>Update the event details</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <Form id={"add-new-event"} method={"put"} onSubmit={handleSubmit}>
                            <FormControl pb={3}>
                                <FormLabel>Change the host</FormLabel>
                                <Select required={true} placeholder='Select a registered host' onChange={handleChange} value={inputs.createdBy} name='createdBy'
                                    _focus={{ borderColor: 'whiteAlpha.600' }} >
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event name</FormLabel>
                                <Input required={true} maxLength={40} name='title' onChange={handleChange} value={inputs.title || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the brief event description</FormLabel>
                                <Textarea required={true} maxLength={55} name={'description'} onChange={handleChange} value={inputs.description || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the more detailed event description</FormLabel>
                                <Textarea required={true} maxLength={200} h={'13vh'} name={'paragraph'} onChange={handleChange} value={inputs.paragraph || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event image</FormLabel>
                                <Textarea required={true} aria-label="image" rows="1" name="image" onChange={handleChange} h={'10vh'} value={inputs.image || ""} placeholder={'Place the image URL here'} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event category/categories</FormLabel>
                                <Stack w={'full'} borderColor={'whiteAlpha.400'} borderRadius={10}>
                                    <select multiple={true} name="categoryIds[]" onChange={handleCheckedCategories} value={inputs.categoryIds} placeholder="Select one or more categories" _focus={{ borderColor: 'whiteAlpha.600' }}>
                                        {categories.map(category => (
                                            <option value={category.id} key={category.id}>{category.name}</option>
                                        ))}</select></Stack></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event location</FormLabel>
                                <Input required={true} maxLength={30} type={'text'} name='location' onChange={handleChange} value={inputs.location || ""} placeholder={'...'} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the start date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='startTime' onChange={handleChange} value={inputs.startTime || ""} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the end date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='endTime' onChange={handleChange} value={inputs.endTime || ""} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <ModalFooter pt={4} my={4} justify={'flex-end'}>
                                <Button colorScheme='yellow' mr={3} type={'submit'} method={"put"} onClick={onClose}>
                                    Save</Button>
                                <Button onClick={() => onClose()} color={'blackAlpha'} colorScheme={'whiteAlpha'}>
                                    Cancel</Button></ModalFooter>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </div >
    );
} 
