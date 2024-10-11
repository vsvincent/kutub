import React from 'react'
import './app.css'
import {
  Paper,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

function Reader() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={10}>
        <Paper elevation={3} style={{
          margin: '10px',
          padding: '20px'
        }}>
          Once upon a time...
          there was a reader.
          and the reader read.
          and the reader read.
          and the reader read.
          and what else?
          he read.
          and then climbed a tree.
          and read.
          and read.
          why did he read?
          because he loved to read.
          and when he was a child?
          he read amongst the reeds.
          and when he was a teenager?
          he read soliloques full of danger.
          and when he was an adult?
          he read books that made him sulk.
          and when he was old?
          he read parchment covered in mold.
          and when he was dead?
          he no longer read.
          but he was remembered.
          not for anything he ever said.
          but because he read.
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Reader
