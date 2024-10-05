import React from 'react';
import { Flex, Box, Text, Link, IconButton } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex
      as="nav"
      className="bg-gray-500 shadow-md px-4 py-2"
      align="center"
      justify="space-between"
    >
      {/* Logo */}
      <Box className="flex-1">
        <Text className="text-lg font-bold">Logo</Text>
      </Box>

      {/* Desktop Links */}
      <Box className="hidden md:flex space-x-4">
        <Link href="#" className="text-gray-700 hover:text-gray-900">
          Home
        </Link>
        <Link href="#" className="text-gray-700 hover:text-gray-900">
          About
        </Link>
        <Link href="#" className="text-gray-700 hover:text-gray-900">
          Services
        </Link>
        <Link href="#" className="text-gray-700 hover:text-gray-900">
          Contact
        </Link>
      </Box>

      {/* Mobile Menu Button */}
      <Box className="md:hidden">
        <IconButton
          aria-label="Open Menu"
          variant="outline"
          className="text-gray-700 hover:bg-gray-100"
        />
      </Box>
    </Flex>
  );
};

export default Navbar;