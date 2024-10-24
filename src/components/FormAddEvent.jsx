import {
    Button, FormLabel, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader, Stack,
    ModalCloseButton, ModalBody, FormControl, useDisclosure, Textarea, useToast, ModalFooter
} from "@chakra-ui/react";
import { React, useState, useRef } from 'react';
import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventsListPage";
import { serverURL } from "./serverURL";

export const actionAddEvent = async ({ request, params }) => {
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData);
    const catIds = formData.getAll("categoryIds[]").map(catId => Number(catId));
    delete formObj["categoryIds[]"];
    const body = JSON.stringify({
        id: params.eventId,
        categoryIds: catIds,
        ...formObj
    });
    await fetch(`${serverURL}/events`, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
    })
        // return null;
        // .then(redirect('./'))
        .then(alert('Success! A new event has been created.'))
};


export const FormAddEvent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users, events, categories } = useLoaderData(loader);
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
        createdBy: "",
        title: "",
        description: "",
        paragraph: "",
        image: "",
        categoryIds: [],
        location: "",
        startTime: "",
        endTime: ""
    });
    const [inputs, setInputs] = useState({ initialInputs });

    const handleCheckedCategories = (event) => {
        const catIds = Array.from(event.target.selectedOptions).map(o => Number(o.value));
        setInputs(values => ({ ...values, categoryIds: catIds.sort() }));
    }

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
    }

    const closeModal = () => {
        setInputs({ ...initialInputs });
        onClose();
    }

    const actionData = useActionData();

    const handleSubmit = async () => {
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
                    description: 'There was an error while creating the event.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                }).then(console.error(error));
            }
        }
        navigate(0);
    }

    return (
        <>
            <Button type={'button'} border={{ base: '1px', md: '0px' }} borderColor={{ base: "whiteAlpha.400" }} h={10} w={'fit-content'} bgColor={{ base: 'inherit', md: 'whiteAlpha.300' }} _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }} onClick={onOpen}>
                Add event</Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal} size={{ base: 'full', lg: 'lg' }}>
                <ModalOverlay bg={'blackAlpha.600'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'}>
                    <ModalHeader>Add the event details</ModalHeader>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody>
                        <Form id={"add-new-event"} method={"post"} onSubmit={handleSubmit}>
                            <FormControl pb={3}>
                                <FormLabel>Select the host</FormLabel>
                                <Select required={true} placeholder='Select a registered host' onChange={handleChange} value={inputs.createdBy} name='createdBy' _focus={{ borderColor: 'whiteAlpha.600' }}>
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the event name</FormLabel>
                                <Input required={true} maxLength={40} name='title' onChange={handleChange} value={inputs.title || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter a brief event description</FormLabel>
                                <Textarea required={true} maxLength={55} name={'description'} onChange={handleChange} value={inputs.description || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the more detailed event description</FormLabel>
                                <Textarea required={true} maxLength={200} h={'20vh'} name={'paragraph'} onChange={handleChange} value={inputs.paragraph || ""} type='text' placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Upload the event image</FormLabel>
                                <Textarea required={true} aria-label="image" rows="5" name="image" onChange={handleChange} value={inputs.image || ""} placeholder={'Enter the image URL here.'}></Textarea></FormControl>

                            <FormControl pb={3} ><FormLabel>Select an event category/categories</FormLabel>
                                <Stack w={'full'} borderColor={'whiteAlpha.400'} borderRadius={10}>
                                    {/* <Select h={'100px'} multiple placeholder="Select one or more categories" name="categoryIds[]" onChange={handleCheckedCategories} value={inputs.categoryIds} _focus={{ borderColor: 'whiteAlpha.600' }}> */}
                                    <select multiple={true} placeholder="Select one or more categories" name="categoryIds[]" onChange={handleCheckedCategories} value={inputs.categoryIds} _focus={{ borderColor: 'whiteAlpha.600' }}>
                                        {categories.map(category => (
                                            <option value={category.id} key={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {/* </Select> */}
                                </Stack></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the event location</FormLabel>
                                <Input required={true} maxLength={30} type={'text'} name='location' onChange={handleChange} value={inputs.location || ""} placeholder='...' _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the start date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='startTime' onChange={handleChange} value={inputs.startTime || ""} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the end date and time</FormLabel>
                                <Input required={true} type={'datetime-local'} name='endTime' onChange={handleChange} value={inputs.endTime || ""} _focus={{ borderColor: 'whiteAlpha.600' }} /></FormControl>

                            <ModalFooter pt={4} my={4} justify={'flex-end'}>
                                <Button colorScheme={'yellow'} mr={3} type={'submit'} method={"post"} onClose={closeModal}>Save</Button>
                                <Button onClick={() => closeModal()} color={'blackAlpha'} colorScheme={'whiteAlpha'}>Cancel</Button></ModalFooter>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
} 
