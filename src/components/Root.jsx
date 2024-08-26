import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';

export const Root = () => {

  const breakpoints = {
    base: '0em',
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  return (
    <Box h={"100%"} pt={5} pb={0} bgColor={'blackAlpha.900'} color={'yellow.500'} align={'center'} scrollBehavior={'smooth'} >
      {/* <Navigation /> */}
      <Outlet w={{ base: '100%', md: 'container.sm', lg: 'container.md' }} />
    </Box>
  );
}