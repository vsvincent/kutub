import React from 'react'
import { Box, Typography, Link, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'gray',
        boxShadow: 1,
        px: 2,
        py: 1,
      }}
    >
      {/* Logo */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Logo
        </Typography>
      </Box>

      {/* Desktop Links */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
        <Link href="#" color="textPrimary" underline="hover">
          Home
        </Link>
        <Link href="#" color="textPrimary" underline="hover">
          Reader
        </Link>
        <Link href="#" color="textPrimary" underline="hover">
          Notes
        </Link>
      </Box>

      {/* Mobile Menu Button */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton aria-label="Open Menu" color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Navbar
