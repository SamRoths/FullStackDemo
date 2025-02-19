import { GitHub, Image } from '@mui/icons-material'
import { Divider, IconButton, Sheet, Typography,Stack, Grid,Box, ImageList } from '@mui/joy'
import { Link } from 'react-router-dom'
import React from 'react'
import { URL_BASE } from '../../../Constants'
import PortfolioProject from '../PortfolioProject'

const projectData = {
    title:'Impulse', 
    context:'Impulse was built in 2022 over the course of about a month. I worked with 3 other developers to put this game demo together.', 
    tools:['Unity','C#','Github','Visual Studio Code'], 
    summary:'You are a lone astronaut, stuck on a space station. You must navigate the space station and seal the holes to complete the game. Thankfully, you have complete control of the gravity on your space station and can use it to help with platforming and solving puzzles.', 
    role:"My primary role on this team was a level designer where I created the game's platforming and box based puzzles. However, due to the nature of working in a small team I also contributed in many other ways such as designing and implementing the games menu UI/UX. Additionally, I conceptualized the core game mechanic of gravity control. I also made many other smaller contributions where needed such as makings some of the games sfx.",
    demoLink:'https://ecse-csds290.itch.io/impulse', 
    images:['media/images/impulseGameImage1.jpg', 'media/images/impulseGameImage2.jpg'] 
}

export default function Impulse() {
    return(<PortfolioProject {...projectData}/>)

  return (
    <Sheet style={{padding:70,
        margin:'auto',
        height:'100vh'
      }}>
        
        <Grid container>
            <Grid item size={6}>
                <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
                    }}>Impulse</Typography>
            </Grid>
            <Grid item size={6}>
                <Box display="flex" justifyContent="flex-end">
                <IconButton  ><GitHub/></IconButton>
                </Box>
            </Grid>
        </Grid>
        <Box display='flex' justifyContent={'center'}>
            <img sx={{width:'100%', height:'100%'}} src={URL_BASE+'media/images/impulseBanner.png'}></img>
        </Box>
        <Divider sx={{ borderBottomWidth: 4, bgcolor: "primary.dark"}}></Divider>
        <Grid container spacing = {4}>
            
            <Grid size = {7} >
            <Typography sx={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:20}}>Context:</Typography>
                <Stack spacing={2}>
                    <Typography>Impulse was built in 2022 over the course of about a month. I worked with 3 other developers to put this game demo together.</Typography>
                </Stack>
            <Typography sx={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:20}}>Tools:</Typography>
                <Stack spacing={2}>
                    Impulse was built using Unity a game engine which uses C# for scripting.
                </Stack>
            <Typography sx={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:20}}>Summary:</Typography>
                <Stack spacing={2}>
                
                <Typography>You are a lone astronaut, stuck on a space station. You must navigate the space station and seal the holes to complete the game. Thankfully, you have complete control of the gravity on your space station and can use it to help with platforming and solving puzzles.</Typography>
                </Stack>
                <Typography sx={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:20}}>My Role:</Typography>
                <Stack spacing={2}>
                    <Typography>My primary role on this team was a level designer where I created the game's platforming and box based puzzles.
                         However, due to the nature of working in a small team I also contributed in many other ways such as designing and implementing the games menu UI/UX.
                         Additionally, I conceptualized the core game mechanic of gravity control. I also made many other smaller contributions where needed such as makings some of the games sfx.</Typography>
                </Stack>
                <Typography sx={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:20}}>Try it Yourself:</Typography>
                <Stack spacing={2}>
                    <Typography>If you would like to try the game for yourself you can do so on itch.io: <Link to={'https://ecse-csds290.itch.io/impulse'} target='_blank'>https://ecse-csds290.itch.io/impulse</Link></Typography>
                </Stack>
            </Grid>
            <Grid size = {5}>
                <Stack spacing={3}>
                <img style={{ width: "100%", height: "100%" }}src={URL_BASE+'media/images/impulseGameImage1.jpg'}/>
                <img style={{ width: "100%", height: "100%" }}src={URL_BASE+'media/images/impulseGameImage2.jpg'}/>
                </Stack>
            </Grid>
        </Grid>
      </Sheet>
  )
}
