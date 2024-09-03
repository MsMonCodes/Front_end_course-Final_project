import { Button, FormLabel, Input, Select, Box, Image, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, useDisclosure, ModalFooter, Switch, InputGroup, Textarea, Checkbox, SelectField, CheckboxGroup, Toast, useToast, FormHelperText, Icon, Stack } from "@chakra-ui/react";
import { React, useState, useRef, isValidElement } from 'react';
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { loader } from "../pages/EventsListPage";
// import { loader } from "../pages/EventDetailsPage";


export const actionEditEvent = async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());
    const body = JSON.stringify({ ...formData, eventId: params.eventId })
    await fetch(`http://localhost:3000/events/${params.eventId}`, {
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
    });
    return redirect(`/event/${params.eventId}`);
};


export const FormEditEvent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { event, users, categories } = useLoaderData(loader);
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

    const isCategoryInEvent = (categoryId) => event.categoryIds.includes(Number(categoryId));
    const [checkedCategories, setCheckedCategories] = useState([isCategoryInEvent]);
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

    const handleCheckedCategories = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let catIds = inputs.categoryIds;
        if (!catIds.includes(value)) {
            catIds.push(Number(value));
        }
        else {
            catIds = catIds.filter((id) => id !== Number(value));
        }
        setCheckedCategories([...catIds]);
        console.log("catIds:", catIds);
        console.log("inputs.categoryIds:", inputs.categoryIds);
        setInputs(values => ({ ...values, [name]: catIds.sort() }));
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'categoryIds') {
            handleCheckedCategories(event);
            // let catIds = inputs.categoryIds;
            // if (event.target.checked) {
            //     catIds.push(Number(value));
            // }
            // else {
            //     catIds = catIds.filter((id) => id !== Number(value));
            // }
            // setCheckedCategories(catIds);
            // console.log("catIds:", catIds)
            // console.log("inputs.categoryIds:", inputs.categoryIds)
            // setInputs(values => ({ ...values, [name]: catIds.sort() }));
        }
        else {
            setInputs(values => ({ ...values, [name]: value }))
        }
    }
    console.log("inputs.categoryIds:", inputs.categoryIds)

    // const handleSubmit = async () => {
    //     // e.preventDefault();
    //     // try {
    //     const response = await fetch(
    //         `http://localhost:3000/events/`, {
    //         method: `PUT`,
    //         body: JSON.stringify(inputs),
    //         headers: { "Content-Type": "application/json;charset=utf-8" },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not okay.');
    //             }
    //             return response.json();
    //         })
    //         // .then(response => response.json())
    //         // .then(await fetch(event))
    //         .then(onClose())
    //         .then(navigate(`./`))
    //         .then(toast({
    //             title: 'Success!',
    //             description: 'This event has been updated.',
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //         }))
    //     // .catch((error) => {
    //     //     toast({
    //     //         title: 'Error',
    //     //         description: 'There was an error while editing the event.',
    //     //         status: 'error',
    //     //         duration: 5000,
    //     //         isClosable: true,
    //     //     })
    //     // });
    // }

    return (
        <>
            <Button type={'button'} h={10} w={'fit-content'} bgColor={'whiteAlpha.300'}
                _hover={{ bgColor: 'yellow.500', color: 'blackAlpha.700', cursor: 'pointer' }}
                onClick={onOpen}>Edit</Button>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={'blackAlpha.500'} backdropFilter={'auto'} backdropBlur='8px' />
                <ModalContent bgColor={'whiteAlpha.700'} color={'blackAlpha.900'} >
                    <ModalHeader>Add your event details</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        <Form
                            // onSubmit={handleSubmit} 
                            id={"add-new-event"} method={"put"} >
                            <FormControl pb={3}><FormLabel>Who is the host of this event?</FormLabel>
                                <Select required={true} placeholder='Select a registered host'
                                    onChange={handleChange} value={inputs.createdBy} name='createdBy'>
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}</Select></FormControl>
                            <FormControl pb={3}><FormLabel>Enter the name of your event</FormLabel>
                                <Input required={true} name='title' onChange={handleChange} value={inputs.title || ""}
                                    type='text' placeholder='...' /></FormControl>
                            <FormControl pb={3}><FormLabel>Type your event description here</FormLabel>
                                <Input required={true} name={'description'} onChange={handleChange} value={inputs.description || ""}
                                    type='text' placeholder='...' /></FormControl>
                            <FormControl pb={3}>
                                <FormLabel>Upload your event image:</FormLabel>
                                <Textarea aria-label="image" rows="1" name="image" required={true} onChange={handleChange} value={inputs.image || ""} placeholder={'Paste the image URL here.'}></Textarea></FormControl>

                            {/* <FormControl pb={3}>
                                <FormLabel>What category does your event fall under?</FormLabel>
                                <Select multiple={true} display={'flex'} flexDir={'column'} name='categoryIds' value={inputs.categoryIds || ""}>
                                    {categories.map((category) => (
                                        <option multiple={true}
                                            // colorScheme={'yellow'} 
                                            pb={2} size={'sm'} name='categoryIds' key={category.id}
                                            onChange={handleChange} value={category.id}
                                        // isChecked={(isCategoryInEvent(category.id))}
                                        >{category.name}</option>
                                    ))} </Select></FormControl> */}

                            <FormControl>
                                <FormLabel mt="2">What category does your event fall under?</FormLabel>
                                <Stack>
                                    <select
                                        value={checkedCategories}
                                        multiple={true}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </Stack>
                            </FormControl>

                            {/* <FormControl>
                                <FormLabel mt="2">Categories</FormLabel>
                                <Stack>
                                    <select
                                        value={checkedCategories}
                                        multiple={true}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            const values = Array.from(
                                                e.currentTarget.selectedOptions,
                                                (option) => option.value
                                            );


                                            let catIds = inputs.categoryIds;
                                            event.target.checked ? (values?.push(Number(values))) : catIds = catIds.filter((id) => id !== Number(values));

                                            // setCheckedCategories([...catIds]);


                                            setCheckedCategories(values.map(Number));
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </Stack>
                            </FormControl> */}


                            <FormControl pb={3}><FormLabel>Enter the location of your event</FormLabel>
                                <Input required={true} type={'text'} name='location' onChange={handleChange} value={inputs.location || ""} /></FormControl>
                            <FormControl pb={3}><FormLabel>Select the start date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'} name='startTime' onChange={handleChange} value={inputs.startTime || ""} /></FormControl>
                            <FormControl pb={3}><FormLabel>Select the end date and time of your event</FormLabel>
                                <Input required={true} type={'datetime-local'} name='endTime' onChange={handleChange} value={inputs.endTime || ""} /></FormControl>
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
