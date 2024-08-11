import { Button, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";

// export const Example = ({ createEvent }) => {
//     const [content, setContent] = useState('');


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         createEvent({ content });
//         setContent('');
//     }

//     return (
//         <>
//             <Heading>Add your event details</Heading>
//             <Form onSubmit={handleSubmit}>
//                 <Input type='text' required='required' placeholder='Type here...' onChange={(e) => setContent(e.target.value)} value={content} />
//                 <Button type='submit'>Add event</Button>
//             </Form>
//         </>
//     )
// }




// export const CreateEvent = ({ createEvent }) => {
//     const [eventImage, setEventImage] = useState('');
//     const [eventTitle, setEventTitle] = useState('');
//     const [eventDescription, setEventDescription] = useState('');
//     const [eventDate, setEventDate] = useState('');
//     const [eventStartTime, setEventStartTime] = useState('');
//     const [eventEndTime, setEventEndTime] = useState('');
//     const [eventLocation, setEventLocation] = useState('');

//     const [eventCategoryName, setCategoryName] = useState('');
//     const [eventHostImage, setEventHostImage] = useState('');
//     const [eventHostName, setEventHostName] = useState('');


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         createEvent({ content });
//         setContent('');
//     }

//     return (
//         <>
//             <Heading>Add your event details</Heading>
//             <Form onSubmit={handleSubmit}>
//                 <Input required='true'
//                     type={'image'}
//                     placeholder='Upload your event image'
//                     onChange={(e) => setEventImage(e.target.value)} value={eventImage} />

//                 <Input required='true'
//                     type='text'
//                     placeholder='What is the name of your event?'
//                     onChange={(e) => setEventTitle(e.target.value)} value={eventTitle} />
//                 <Input required='true'
//                     type='text'
//                     placeholder='Type your event description here'
//                     onChange={(e) => setEventDescription(e.target.value)} value={eventDescription} />

//                 <Input required='true'
//                     type={'datetime-local'}
//                     placeholder='Select the date of your event'
//                     value={{ eventDate, eventStartTime }}
//                     onChange={(e) => { setEventDate(e.target.value), setEventStartTime(e.target.value) }} />
//                 {/* <Input type={'datetime-local'} required='true' placeholder='Select the date of your event' onChange={(e) => setEventDate(e.target.value)} value={eventDate} />
//                 <Input type={'datetime-local'} required='true' placeholder='Select the start time of your event' onChange={(e) => setEventStartTime(e.target.value)} value={eventStartTime} /> */}

//                 <Input
//                     type={'datetime-local'}
//                     required='true'
//                     placeholder='Select the date of your event'
//                     onChange={(e) => setEventDate(e.target.value)} value={eventDate} />
//                 <Input type={'datetime-local'} required='true' placeholder='Select the start time of your event' onChange={(e) => setEventStartTime(e.target.value)} value={eventStartTime} />

//                 <Input required='true'
//                     type={'datetime-local'}
//                     placeholder='Select the end time of your event'
//                     onChange={(e) => setEventEndTime(e.target.value)} value={eventEndTime} />
//                 <Input required='true'
//                     type={'text'}
//                     placeholder='What is the location of your event?'
//                     onChange={(e) => setEventLocation(e.target.value)} value={eventLocation} />
//                 <Input required='true'
//                     type={'text'}
//                     placeholder='What category does your event fall under?'
//                     onChange={(e) => setCategoryName(e.target.value)} value={eventCategoryName} />
//                 <Input required='true'
//                     type={'image'}
//                     placeholder='Upload an image of the host of this event'
//                     onChange={(e) => setEventHostImage(e.target.value)} value={eventHostImage} />
//                 <Input required='true'
//                     type='text'
//                     placeholder='What is the name of the host of this event?'
//                     onChange={(e) => setEventHostName(e.target.value)} value={eventHostName} />
//                 <Button type='submit'>Add event</Button>
//             </Form>
//         </>
//     )
// }




export const AddEventForm = () => {
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

    return (
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
        </Form>
    );
}
