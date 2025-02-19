import React from 'react'
import ProjectCard from './ProjectCard'
import { Accordion,AccordionSummary,AccordionDetails,Typography, Grid2, Icon } from '@mui/material'
import { ExpandMore, Language, MiscellaneousServices, QueryStats, SportsEsports } from '@mui/icons-material'

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
    <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:25
                    }} >{getIcon()}{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid2 container spacing={2}>
            {data.map((project)=>(<Grid2 item size = {4} style={{display: 'flex'}}><ProjectCard {...project} /></Grid2>))}
          </Grid2>
          
        </AccordionDetails>
      </Accordion>
  )
}
