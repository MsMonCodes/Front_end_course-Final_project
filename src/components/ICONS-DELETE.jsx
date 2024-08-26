import { HStack } from "@chakra-ui/react";
import React from "react";
import { CiSearch, CiCirclePlus, CiFilter, CiCircleMinus } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaPlus, FaMinus, FaFilter } from "react-icons/fa6";

export const SearchBar = () => {
    return (
        <div className="Search bar">
            <HStack>
                <CiSearch size={25} />
                <CiFilter size={25} />
                <CiCirclePlus size={25} />
                <CiCircleMinus size={25} />
                {/* <FaPlus />
                <FaMinus />
                < FaFilter />
                <FaSearch /> */}
            </HStack>
        </div>
    );
}