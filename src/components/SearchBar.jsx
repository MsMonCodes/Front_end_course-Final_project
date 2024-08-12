import { Box, Button, Heading, Icon, IconButton, Input, Spinner } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export const SearchBar = ({ barWidth }) => {
    return (
        <>
            <div id="sidebar">
                {/* <Heading>Search Events</Heading> */}
                <Box display={'inline-flex'}>

                    <Form id="search-form" role="search" >
                        <Input borderEndRadius={0} borderColor={'whiteAlpha.400'} w={barWidth}
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <Box
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <Box
                            className="sr-only"
                            aria-live="polite"
                        >
                        </Box>
                    </Form>
                    <Form method="post" >
                        <Button bg={'whiteAlpha.400'} borderStartRadius={0} method="post" type="submit">Search</Button>
                    </Form>

                </Box>
                {/* <nav>
                    <ul>
                        <li>
                            <a href={`/contacts/1`}>Your Name</a>
                        </li>
                        <li>
                            <a href={`/contacts/2`}>Your Friend</a>
                        </li>
                    </ul>
                </nav> */}
            </div >
            <div id="detail"></div>
        </>
    );
}