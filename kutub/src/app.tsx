import React from 'react'
import './app.css'
import { CssBaseline } from '@mui/material'
import Router from './component/router'
import PageWrapper from './page-wrapper'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <PageWrapper>
        <Router />
      </PageWrapper>
    </React.Fragment>
  )
}

export default App
