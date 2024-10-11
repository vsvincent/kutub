import React from 'react'
import './app.css'
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button 
} from '@mui/material'
import EditorWrapper from './editor/editor-wrapper'
function Home() {
  return (
    <Card sx={{ textAlign: 'center', maxWidth: 345, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          The Islamic Archive
        </Typography>
        <Typography variant="body2">
          Bismillah!
        </Typography>
        <EditorWrapper content={'content2'} editable={true} />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Continue here
        </Button>
      </CardActions>
    </Card>
  )
}

export default Home
