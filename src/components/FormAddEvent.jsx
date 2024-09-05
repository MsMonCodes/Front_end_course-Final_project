import {
    Button, FormLabel, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, FormControl, useDisclosure, Textarea, useToast, ModalFooter
} from "@chakra-ui/react";
import { React, useState, useRef } from 'react';
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventsListPage";
// import { loader } from "../pages/EventDetailsPage";

export const actionAddEvent = async ({ request, params }) => {
    console.log("action is running: Add form");
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData);
    const catIds = formData.getAll("categoryIds[]").map(catId => Number(catId));
    delete formObj["categoryIds[]"];
    const body = JSON.stringify({
        id: params.eventId,
        categoryIds: catIds,
        ...formObj
    });
    await fetch("http://localhost:3000/events", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
    })
    return null;
};

// reference: initialInputs handleChange

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
        image: "",
        categoryIds: [],
        location: "",
        startTime: "",
        endTime: ""
    });
    const [inputs, setInputs] = useState({ initialInputs });
    // const [inputs, setInputs] = useState({
    //     createdBy: "",
    //     title: "",
    //     description: "",
    //     image: "",
    //     categoryIds: [],
    //     location: "",
    //     startTime: "",
    //     endTime: ""
    // });

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
        console.log(`running handleSubmit`);
        response => {
            if (!response.ok) {
                throw new Error('Network response was not okay.');
            }
            return response.json()
        };

        try {
            await fetch(actionData)
                .then(alert('Success! A new event has been created.'))
            // .then(navigate(0));
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
            <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'}
                _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }}
                onClick={onOpen}>Add event</Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay bg={'blackAlpha.500'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'} >
                    <ModalHeader>Add your event details</ModalHeader>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody>
                        <Form onSubmit={handleSubmit} id={"add-new-event"} method={"post"}>
                            <FormControl pb={3}>
                                <FormLabel>Who is the host of this event?</FormLabel>
                                <Select required={true} placeholder='Select a registered host'
                                    onChange={handleChange} value={inputs.createdBy} name='createdBy'>
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the name of your event</FormLabel>
                                <Input required={true} name='title' onChange={handleChange}
                                    value={inputs.title || ""} type='text' placeholder='...' /></FormControl>

                            <FormControl pb={3}><FormLabel>Type your event description here</FormLabel>
                                <Input required={true} name={'description'}
                                    onChange={handleChange}
                                    value={inputs.description || ""}
                                    type='text' placeholder='...' /></FormControl>

                            <FormControl pb={3}><FormLabel>Upload your event image:</FormLabel>
                                <Textarea aria-label="image" rows="1" name="image" required={true}
                                    onChange={handleChange} value={inputs.image || ""}
                                    placeholder={'Insert the image URL here.'}></Textarea></FormControl>

                            <FormControl pb={3}><FormLabel>What category does your event fall under?</FormLabel>
                                <select multiple={true} placeholder="Select one or more categories" name="categoryIds[]"
                                    value={inputs.categoryIds} onChange={handleCheckedCategories}>
                                    {categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))} </select></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the location of your event</FormLabel>
                                <Input required={true} type={'text'}
                                    name='location' onChange={handleChange} value={inputs.location || ""} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the start date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'}
                                    name='startTime' onChange={handleChange} value={inputs.startTime || ""} /></FormControl>

                            <FormControl pb={3}><FormLabel>Enter the end date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'}
                                    name='endTime' onChange={handleChange} value={inputs.endTime || ""} /></FormControl>

                            <ModalFooter pt={4} my={4} justify={'flex-end'}>
                                <Button colorScheme='yellow' mr={3} type={'submit'} method={"post"} onClose={closeModal}>Save & View</Button>
                                <Button onClick={() => closeModal()} color={'blackAlpha'} colorScheme={'whiteAlpha'}>Cancel</Button></ModalFooter>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    );
} 
