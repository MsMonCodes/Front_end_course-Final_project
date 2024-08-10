import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';

export const Root = () => {

  // const breakpoints = {
  //   base: '30em', // ~480px. em is a relative unit and is dependant on the font size.
  //   md: '48em', // ~768px
  //   lg: '62em', // ~992px
  // }

  return (
    <Box pb={12} bgColor={'blackAlpha.900'} color={'whiteAlpha.800'} align={'center'} >
      <Navigation />
      <Outlet />
    </Box>
  );
};