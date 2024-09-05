import { Button, FormLabel, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Textarea, useToast, Stack } from "@chakra-ui/react";
import { React, useState, useRef } from 'react';
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventDetailsPage";

export const actionEditEvent = async ({ request, params }) => {
    console.log("action is running: Edit form");
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData);
    const catIds = formData.getAll("categoryIds[]").map(catId => Number(catId));
    delete formObj["categoryIds[]"];
    const body = JSON.stringify({
        id: params.eventId,
        categoryIds: catIds,
        ...formObj
    });
    return await fetch(`http://localhost:3000/events/${params.eventId}`, {
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

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={'blackAlpha.500'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'}>
                    <ModalHeader>Update the event details</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <Form id={"add-new-event"} method={"put"} onSubmit={handleSubmit}>
                            <FormControl pb={3}><FormLabel>Change the host</FormLabel>
                                <Select required={true} placeholder='Select a registered host' onChange={handleChange} value={inputs.createdBy} name='createdBy' focusBorderColor={'whiteAlpha.600'} >
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event name</FormLabel>
                                <Input required={true} name='title' onChange={handleChange} value={inputs.title || ""} type='text' placeholder='...' focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event description</FormLabel>
                                <Input required={true} name={'description'} onChange={handleChange} value={inputs.description || ""} type='text' placeholder='...' focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event image</FormLabel>
                                <Textarea aria-label="image" rows="1" name="image" required={true} onChange={handleChange} h={'10vh'} value={inputs.image || ""} placeholder={'Place the image URL here'} focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event category/categories</FormLabel>
                                <Stack w={'full'} borderColor={'whiteAlpha.400'} borderRadius={10}>
                                    <select multiple={true} placeholder="Select one or more categories" name="categoryIds[]" value={inputs.categoryIds} onChange={handleCheckedCategories} focusBorderColor={'red.600'}>
                                        {categories.map(category => (
                                            <option value={category.id} key={category.id}>{category.name}</option>
                                        ))}</select></Stack></FormControl>

                            <FormControl pb={3}><FormLabel>Change the event location</FormLabel>
                                <Input required={true} type={'text'} name='location' onChange={handleChange} value={inputs.location || ""} focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the start date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='startTime' onChange={handleChange} value={inputs.startTime || ""} focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <FormControl pb={3}><FormLabel>Change the end date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='endTime' onChange={handleChange} value={inputs.endTime || ""} focusBorderColor={'whiteAlpha.600'} /></FormControl>

                            <ModalFooter pt={4} my={4} justify={'flex-end'}>
                                <Button colorScheme='yellow' mr={3} type={'submit'} method={"put"} onClick={onClose}>
                                    Save & View</Button>
                                <Button onClick={() => onClose()} color={'blackAlpha'} colorScheme={'whiteAlpha'}>
                                    Cancel</Button></ModalFooter>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </div >
    );
} 
