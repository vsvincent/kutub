import React from 'react'
import './app.css'
import Navbar from './component/navbar'
import { Box } from '@mui/material'

interface PageWrapperProps {
  children: React.ReactNode;
}

function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column' }}>
        <Navbar />
        {children}
      </Box>
    </>
  )
}

export default PageWrapper
