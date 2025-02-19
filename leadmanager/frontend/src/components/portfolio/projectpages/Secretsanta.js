import { Paper, Typography } from '@mui/material'
import React from 'react'
import PortfolioProject from '../PortfolioProject'

const projectData = {
  title:'Secret Santa Web App', 
  context:'I built this fullstack app as a solo developer when me and some online friends ran into some issues coordinating a secret santa group.', 
  tools:['Django Rest Framework','React', 'Material UI','React Redux','AWS'], 
  summary:"If you want to participate in secret santa group with people who are far away it can be difficult to randomly assign pairings without anyone knowing eachother's secret santa. This app solves this problem. Along with randomly assigning secret santas this app also acts as a hub of information for your secret santa group. This allows users to quickly and easily find information like individual gift preferences, contact information and suggested prices.", 
  role: 'As a solo developer I built every piece of this full stack web app. This includes but is not limited to Frontend UI/UX, API endpoints, and database structure',
  demoLink:'/#/secretsanta', 
  images:['media/images/SecretSantaImage1.PNG', 'media/images/SecretSantaImage2.PNG','media/images/SecretSantaImage3.PNG','media/images/SecretSantaImage4.PNG'] 
}

export default function Secretsanta() {
  return (
    <PortfolioProject {...projectData}/>
  )
}
