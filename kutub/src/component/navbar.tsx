import React from 'react'
import { Typography, Link, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid2'

const Navbar = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: 'gray',
        boxShadow: 1,
        px: 2,
        py: 1,
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <Grid size={{ xs: 6, md: 4 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Logo
        </Typography>
      </Grid>

      {/* Desktop Links */}
      <Grid
        size={{ xs: 6, md: 4 }}
        sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}
      >
        <Link href="/" color="textPrimary" underline="hover">
          Home
        </Link>
        <Link href="/reader" color="textPrimary" underline="hover">
          Reader
        </Link>
        <Link href="/mapper" color="textPrimary" underline="hover">
          Notes
        </Link>
      </Grid>

      {/* Mobile Menu Button */}
      <Grid
        size={{ xs: 6, md: 4 }}
        sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}
      >
        <IconButton aria-label="Open Menu" color="inherit">
          <MenuIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Navbar
