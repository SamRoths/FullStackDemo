import React from "react";
import { Typography, Sheet } from "@mui/joy";
import { GAME_DEV, ML, OTHER, WEB_DEV } from "./types";
import Category from "./Category";
import { URL_BASE } from "../../Constants";

const categories = [
  GAME_DEV,
  WEB_DEV,
  ML,
  OTHER
]

const data = {
  [GAME_DEV]:[{
    title:'Impulse', 
    description:'A game built in Unity where the player has complete control of the gravity on their spaceship. The player must navigate dangerous terain and solve puzzles to save the ship from destruction.',
    date : 'April - May 2022',
    link: '/projects/impulse',
    image: URL_BASE+'media/images/impulseBanner.png',
    numLikes :0
},{
  title:'Seamline', 
  description:'A game built in Unity where the player can pass through the fabric of space time to travel to a parallel dimension using their crochet hook. The player must fight and defeat various monsters to beat the game.',
  date : 'August - December 2023',
  link: '/projects/seamline',
  image: URL_BASE+'media/images/SeamlineBanner.png',
  numLikes :0
}
],
  [WEB_DEV]:[{
    title:'Secret Santa', 
    description:"If you want to participate in secret santa group with people who are far away it can be difficult to randomly assign pairings without anyone knowing eachother's secret santa. This app solves this problem and other group management issues.",
    date : 'November - December 2024',
    link: '/projects/secret-santa',
    image: URL_BASE+'media/images/SecretSantaBanner.jpg',
    numLikes :5
},
{
  title:'Lead Manager', 
  description:'This simple app acts as a tracker for different interations you may have had whether it for in Sales, Networking or other purposes',
  date : "October 2024",
  link: '/projects/leadmanager',
  image: URL_BASE+'media/images/LeadManagerBanner.jpg',
  numLikes :0
}],
  [ML]:[{
    title:'Comfi - Movie Matching App', 
    description:'This mobile app allows users to find a movie to watch together by each swiping through a list of movies until they can agree one. It uses a ML model to suggest movies which the users will all like.',
    date : 'January - May 2024',
    link: '/projects/comfi',
    numLikes :0
},
{
  title:'WGAN Image Generation', 
  description:'In this project I implemented and trained a WGAN to generate images based on the CIFAR-10 dataset',
  date : "March 2024",
  link: '/projects/image-gen',
  numLikes :0
},
{
  title:'Climbing Hold Object Detection', 
  description:'In this project I used Fast R-CNN to detect and find a bounding box for all climbing holds in an image.',
  date : "April 2024",
  link: '/projects/climbing-detection',
  numLikes :0
},
{
  title:'Kilter Board Climb Grader', 
  description:'In this project we compare different machine learning approaches to classification of kilter board climbs based on difficulty',
  date : 'November-December 2023',
  link: '/projects/kilterboard',
  numLikes :0
}
],
  [OTHER]:[]
}

const icons = {
  [GAME_DEV]:'gaming',
  [WEB_DEV]:'web',
  [ML]:'ml',
  [OTHER]:'other'
}

function ProjectsHome() {



    return ( 
    <div style={{padding:40,
      margin:'auto'
    }}>
            {categories.map((category)=>(<Category title={category} data={data[category]} icon={icons[category]}/>))}

        
    </div> 
    );
}

export default ProjectsHome;