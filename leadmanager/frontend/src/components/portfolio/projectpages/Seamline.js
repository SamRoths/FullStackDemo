import React from "react";
import PortfolioProject from "../PortfolioProject";


const summary = "This is a 2D, top-down Adventure RPG single player game. The player must use their world-shifting (stitching) capabilities to fix the rift affecting two worlds. In the process, they must battle against enemies, escape dungeons, and solve puzzles as they traverse both worlds. \n\nGameplay will feature real-time combat (as opposed to turn-based) against npc’s, similar to Zelda Link to the Past (The Legend of Zelda: A Link to the Past. Nintendo, 1991), and the ability to shift between two distinct realities like in Portal Reloaded (Portal 2 mod, Valve & Jannis Brinkmann, 2011 and 2021) using a special stitching technique. \n\nThe player will have a crochet hook as a weapon/tool that it can use to hook enemies, move toward them, attack, and block. Together with some yarn, it will help as a portal closer/opener to the other reality. Yarn will also serve as a shield for the player and as a trap for enemies. Players must defeat enemies by “fixing them”- weaving them back to shape. \n\nBecause the realities are parallel but opposites, they are interlinked. As such, players will have to use an object from one reality in the other reality, or solve puzzles in one reality that affect the other reality. Perhaps an enemy escapes from one reality to another and the player must chase them. These tactics will allow the player to keep moving forward and mend the world back together where it has been split." 

const projectData = {
  title:'Seamline', 
  context:'This game was built as part of a semester long project in the Fall of 2023 where I worked with 10 other students. This project gave me the opportunity to work with a larger team of developers and students from the neighboring art school', 
  tools:['Unity','C#','Github','Visual Studio Code'], 
  summary:summary,
  role: "I worked as the main character developer on this team. As such I implemented the majority of npc behaviors and abilities along with the player character's abilities like the laso stitch. Additionally, I worked closely with our character designer and animator to integrate all character animations into the game.",
  demoLink:'https://cwru-ecse390.itch.io/seamline-f2023-team-3', 
  images:['media/images/SeamlineImage1.png', 'media/images/SeamlineImage2.png','media/images/SeamlineImage3.png','media/images/SeamlineImage4.png','media/images/SeamlineImage5.png'] 
}

const Seamline = () => {
  return (
    <PortfolioProject {...projectData}/>
  );
};

export default Seamline;
