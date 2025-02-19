import { Paper, Typography } from '@mui/material'
import React from 'react'
import PortfolioProject from '../PortfolioProject'

const projectData = {
  title:'Lead Manager Full Stack App', 
  context:'This app was built as a solo project to help me refresh and learn some of the technologies involved', 
  tools:['Django Rest Framework','React', 'Material UI','React Redux','AWS'], 
  summary:'This simple app acts as a tracker for different interations you may have had whether it for in Sales, Networking or other purposes. Every entry created is attached to your account and cannot be viewed by others.', 
  role: 'As a solo developer I built every piece of this full stack web app. This includes but is not limited to Frontend UI/UX, API endpoints, and database structure',
  demoLink:'/leads', 
  images:['media/images/LeadManagerImage1.PNG', 'media/images/LeadManagerImage2.PNG','media/images/LeadManagerImage3.PNG'] 
}

export default function Leadmanager() {
  return (
    <PortfolioProject {...projectData}/>
  )
}
