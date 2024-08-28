import { Hide, Icon, VisuallyHidden } from "@chakra-ui/react";
import { CiSearch, CiCirclePlus, CiFilter, CiCircleMinus } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

export const FilterElement = () => {
    return (
        <>
            <Icon type={'button'} h={10}
                w={5}
                // bgColor={'yellow.100'} 
                _hover={{ color: 'white', cursor: 'pointer' }}
            // onClick={onOpen}
            >
                <CiFilter
                    size={25}
                // type={'button'}
                // boxSize={35}
                // alignSelf={'flex-end'}
                // justifyContent={'right'}
                />
            </Icon >
        </>
    )
}