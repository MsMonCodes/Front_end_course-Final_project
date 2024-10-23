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
            <Box w={{ base: 200, md: 'fit-content' }}
            //  colorScheme='yellow'
            >
                <InputGroup className="searchInputs" borderEndRadius={0} borderColor={'whiteAlpha.400'}>
                    <Input borderWidth={{ base: '0px 0px 1px 0px', md: '1px' }} borderRadius={{ base: 0, md: 7.5 }} type="text" placeholder={placeholder} value={searchInput} onChange={handleFilter} _hover={{ borderColor: 'whiteAlpha.600' }} _focus={{ borderWidth: { base: '0px 0px 1px 0px', md: '1px' }, borderColor: 'whiteAlpha.600' }} focusBorderColor={'whiteAlpha.600'} />
                    <InputRightElement className="searchIcon">
                        {filteredEvents.length == 0
                            ? (<CiSearch size={20} />)
                            : (<IoCloseOutline id="clearButton" color={'yellow.200'} onClick={clearInput} />)
                        }</InputRightElement></InputGroup>
                {filteredEvents.length != 0 && (
                    <List className="dataResult" textAlign={'left'} bgColor={'white'} overflow={'hidden'} overflowY={'auto'} overscrollBehaviorY={'contain'} position={'absolute'} zIndex={2} borderRadius={8} w={'inherit'} >
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