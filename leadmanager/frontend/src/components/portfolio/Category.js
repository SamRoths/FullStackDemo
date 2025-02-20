import React from 'react'
import ProjectCard from './ProjectCard'
import {Icon} from '@mui/material'
import { Accordion,AccordionSummary,AccordionDetails,Typography, Grid } from '@mui/joy'
import { ExpandMore, Language, MiscellaneousServices, QueryStats, SportsEsports } from '@mui/icons-material'
import { Box } from '@mui/material'
import PortfolioPreviewCard from './PortfolioPreviewCard'

export default function Category({
  title='Category Title',
  data = [],
  icon = ''
}) {
  console.log(title,': ',data)
  const getIcon=()=>{
    switch(icon){
      case 'gaming':
        return (<SportsEsports/>)
      case 'web':
        return(<Language/>)
      case 'ml':
        return(<QueryStats/>)
      case 'other':
        return(<MiscellaneousServices/>)
      default:
        console.log("Icon: "+icon+" not found")
        return(<Icon/>)
    }
  }
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#333",
      padding:1,
      marginLeft: 0,
    }}>
    <Accordion defaultExpanded sx={{ maxWidth: 800, mt: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:25
                    }} >{getIcon()}{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {data.map((project)=>(<Grid item size = {12} style={{display: 'flex'}}><PortfolioPreviewCard {...project} /></Grid>))}
          </Grid>
          
        </AccordionDetails>
      </Accordion>
      </Box>
  )
}
