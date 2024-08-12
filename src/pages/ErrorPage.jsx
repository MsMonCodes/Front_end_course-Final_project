import { Box, Container, Heading, Text, Flex, Stack, HStack, StackDivider } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" align={'center'}>
            <Stack pt={'40vh'} >
                <Heading>Oops!</Heading>
                <Text fontSize={'2xl'}>Sorry, an unexpected error has occurred:</Text>
                <Text>
                    <i>"{error.statusText || error.message}"</i>
                </Text>
            </Stack>

        </div >
    );
}