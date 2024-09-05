import { Box, color, Input, InputGroup, InputRightElement, List, ListItem, Text } from "@chakra-ui/react";
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
            <Box w={'3xs'} colorScheme='yellow'>
                <InputGroup className="searchInputs"
                    borderEndRadius={0}
                    borderColor={'whiteAlpha.400'}>

                    <Input type="text" placeholder={placeholder} value={searchInput} onChange={handleFilter}
                        _hover={{ borderColor: 'whiteAlpha.600' }}
                        _focus={{ border: '1px', borderColor: 'whiteAlpha.600' }} focusBorderColor={'whiteAlpha.600'}
                    />
                    <InputRightElement className="searchIcon">
                        {filteredEvents.length == 0
                            ? (<CiSearch size={20} />)
                            : (<IoCloseOutline id="clearButton" color={'yellow.200'} onClick={clearInput} />)
                        }</InputRightElement></InputGroup>
                {filteredEvents.length != 0 && (
                    <List className="dataResult" textAlign={'left'} bgColor={'white'}
                        overflow={'hidden'} overflowY={'auto'} overscrollBehaviorY={'contain'} position={'absolute'}
                        zIndex={2} borderRadius={8} w={'inherit'}
                    >
                        {filteredEvents.slice(0, 15).map((value, key) => {
                            return (
                                <ListItem px={4} py={1} key={value.id} _hover={{ bg: "blue.500", color: "white", cursor: "pointer" }}>
                                    <Link to={`/event/${value.id}`} className="dataItem" >
                                        <Text fontSize={'md'}>{value.title}</Text></Link></ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>
        </div >
    );
}