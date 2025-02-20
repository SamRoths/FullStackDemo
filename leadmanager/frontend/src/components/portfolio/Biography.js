
import React from "react";
import { Box, Typography, Button, Avatar, Card, CardContent, Link, Grid } from "@mui/joy";

const Biography = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        textAlign: "center",
        gap: 3,
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        color: "#333",
        padding: 4,
        marginLeft: 0,
      }}
    >
      <Avatar
        src="/media/images/IMG_6876.jpg"
        alt="Samuel Rothschild"
        sx={{ width: 300, height: 300, mb: 2, border: "4px solid #333" }}
      />
      <Typography level="h2" sx={{ fontWeight: "bold", fontSize: "2.5rem" }}>
        Samuel Rothschild
      </Typography>
      <Typography level="body1" sx={{ maxWidth: 900, opacity: 0.9, fontSize: "1.5rem" }}>
      A passionate software engineer who is always looking for opportunities to learn more and has an expertise in machine learning, backend web development, and game development. 
      </Typography>
      
      <Grid container spacing={2} sx={{ maxWidth: 1000, mt: 3 }}>
      <Grid xs={12} sm={12}>
          <Card variant="outlined" sx={{ background: "rgba(255, 255, 255, 0.7)", color: "#333", borderRadius: "12px" }}>
            <CardContent>
              <Typography level="h4" sx={{ fontSize: "1.8rem" }}>About Me</Typography>
              <Typography level="body2" sx={{ fontSize: "1.2rem" }}>  I recently recieved a Bachelors of Science in computer science with a concentration in artificial intelligence from Case Western Reserve University and have done work on projects in a wide range of topics. During college, I also worked as a software engineering intern at 40Grid where I wrote multithreaded APIs, designed UI/UX, and gathered feedback from existing customers </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12}>
          <Card variant="outlined" sx={{ background: "rgba(255, 255, 255, 0.7)", color: "#333", borderRadius: "12px" }}>
            <CardContent>
              <Typography level="h4" sx={{ fontSize: "1.8rem" }}>Hobbies</Typography>
              <Typography level="body2" sx={{ fontSize: "1.2rem" }}> Outside of work I have found that what I enjoy most in my hobbies such as climbing is that opportunity to break down and solve a problem in front of me. When I am not climbing or programming I am often playing video games with some of my friends. Lately I have been playing a lot of Ultrakill and Marvel Rivals, but my all time favorite games are Overwatch, Skyrim and Minecraft</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12}>
          <Card variant="outlined" sx={{ background: "rgba(255, 255, 255, 0.7)", color: "#333", borderRadius: "12px" }}>
            <CardContent>
              <Typography level="h4" sx={{ fontSize: "1.8rem" }}>Contact Info</Typography>
              <Typography level="body2" sx={{ fontSize: "1.2rem" }}>
                <Link href="https://github.com/SamRoths" target="_blank" sx={{ color: "#0056b3" }}>GitHub</Link>
              </Typography>
              <Typography level="body2" sx={{ fontSize: "1.2rem" }}>
                <Link href="https://www.linkedin.com/in/samuel-rothschild-4020811ba/" target="_blank" sx={{ color: "#0056b3" }}>LinkedIn</Link>
              </Typography>
              <Typography level="body2" sx={{ fontSize: "1.2rem" }}>
                <Link href="mailto:scrothschild45@gmail.com" sx={{ color: "#0056b3" }}>scrothschild45@gmail.com</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Button fullWidth component="a" target="_blank" href="https://drive.google.com/file/d/1DemSvNXK-dpMElIEJXz06Qvr_HRlIDHM/view?usp=sharing" variant="solid" color ="success" sx={{ mt: 3, color: "#ffffff", fontWeight: "bold", fontSize: "1.5rem", padding: "10px 20px", borderRadius: "8px" }}>
        Download Resume
      </Button>
        <Button fullWidth component="a" href="/#/projects" variant="solid" sx={{ mt: 3, backgroundColor: "#0056b3", color: "#ffffff", fontWeight: "bold", fontSize: "1.5rem", padding: "10px 20px", borderRadius: "8px" }}>
        View My Work
      </Button>
      </Grid>
      
      
    </Box>
  );
};

export default Biography;
