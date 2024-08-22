import { Box, Button, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export const SearchBar = ({ barWidth, events }) => {
    const [searchField, setSearchField] = useState('');
    // const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchField.toLowerCase()));


    const navigate = useNavigate();
    useEffect(() => {
        const exactMatch = events.find(
            (event) => event.title.toLowerCase() === searchField.toLowerCase()
            // (event) => event.title.toLowerCase().includes(searchField.toLowerCase())
        );

        if (exactMatch) {
            navigate(`/event/${exactMatch.id}`);
        }
        // searchField('');
    }, [searchField, events, navigate]);


    return (
        <>
            <div id="sidebar">
                {/* <Heading>Search Events</Heading> */}
                <Box display={'inline-flex'}>

                    <Box id="search-form" role="search" >
                        <Input borderEndRadius={0} borderColor={'whiteAlpha.400'} w={barWidth}
                            aria-label="Search contacts"
                            placeholder="Search events..."
                            type="search"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        {/* <Box
                            id="search-spinner"
                            aria-hidden
                        // hidden={true}
                        />
                        <Box
                            className="sr-only"
                            aria-live="polite"
                        >
                        </Box> */}
                    </Box>
                    <Form
                    // method="post" 
                    >
                        <Button bg={'whiteAlpha.400'} borderStartRadius={0}
                        // method="post" 
                        // type="submit"
                        >Search</Button>
                    </Form>

                </Box>
            </div >
            <div id="detail"></div>
        </>
    );
}