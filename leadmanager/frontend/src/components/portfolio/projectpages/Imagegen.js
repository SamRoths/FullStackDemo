import { Paper, Typography } from '@mui/material'
import React from 'react'

const projectData = {
  title:'', 
  context:'', 
  tools:[], 
  summary:'', 
  role: '',
  demoLink:'/', 
  images:[] 
}

export default function Imagegen() {
  return (
    <Paper style={{padding:70,
        width:'80%',
        margin:'auto',
        height:'100vh'
      }}>
        <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
            }}>WGAN image generation</Typography>
        <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit',fontSize:16
            }}>Page is currently under construction, please comeback to check it out later! :) </Typography>
      </Paper>
  )
}
