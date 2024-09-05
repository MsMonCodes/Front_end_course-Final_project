import { Box, Input, InputGroup, InputRightElement, List, ListItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const SearchBar = ({ placeholder, events }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setSearchInput(searchWord);
        const newFilter = events.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredEvents([]);
        } else {
            setFilteredEvents(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredEvents([]);
        setSearchInput("");
    };


    return (
        <div className="search">
            <Box>
                <InputGroup className="searchInputs" borderEndRadius={0} borderColor={'whiteAlpha.400'}>
                    <Input type="text" placeholder={placeholder} value={searchInput} onChange={handleFilter} />
                    <InputRightElement className="searchIcon">
                        {filteredEvents.length === 0
                            ? (<CiSearch size={20} />)
                            : (<IoCloseOutline id="clearBtn" color={'yellow.200'} onClick={clearInput} />)
                        }</InputRightElement></InputGroup>
                {filteredEvents.length != 0 && (
                    <List className="dataResult" textAlign={'left'} pl={2} pt={2} bgColor={'blackAlpha.900'} overflow={'hidden'}
                        overflowY={'auto'} overscrollBehaviorY={'contain'} position={'absolute'} zIndex={2}>
                        {filteredEvents.slice(0, 15).map((value, key) => {
                            return (
                                <ListItem key={value.id} _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}>
                                    <Link to={`/event/${value.id}`} className="dataItem" >
                                        <Text>{value.title}</Text></Link></ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>
        </div >
    );
}

