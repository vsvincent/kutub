import React from 'react'
import './app.css'
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button 
} from '@mui/material'
import Navbar from './component/navbar'
import Tiptap from './editor/tiptap'

function Home() {
  return (
    <>
      <Navbar />
      <Card sx={{ textAlign: 'center', maxWidth: 345, margin: '0 auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            The Islamic Archive
          </Typography>
          <Typography variant="body2">
            Bismillah!
          </Typography>
          <Tiptap />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Continue here
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default Home
