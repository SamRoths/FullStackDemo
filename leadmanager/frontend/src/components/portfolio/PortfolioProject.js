import React from "react";
import { Box, Typography, Sheet, Button, List, ListItem, Card, AspectRatio, Grid } from "@mui/joy";
import { URL_BASE } from "../../Constants";


// Custom Theme with Roboto Flex


const PortfolioProject = ({ title, context, tools, summary, role, demoLink, images }) => {
  return (
    <Sheet
      variant="soft"
      sx={{
        maxWidth: 1000,
        mx: "auto",
        my: 4,
        p: 4,
        borderRadius: "xl",
        boxShadow: "lg",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",

      }}
    >
      {/* Project Title at the Top */}
      <Typography 
        level="h2" 
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "primary.700",
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {/* Left Side - Project Info */}
        <Grid xs={12} md={7}>
          {/* Context Section */}
          <Sheet variant="outlined" sx={sectionStyle}>
            <Typography level="h4" sx={headingStyle}>Context</Typography>
            <Typography style={{whiteSpace: 'pre-line'}} level="body1">{context}</Typography>
          </Sheet>

          {/* Tools Section */}
          <Sheet variant="outlined" sx={sectionStyle}>
            <Typography level="h4" sx={headingStyle}>Tools Used</Typography>
            <List>
              {tools.map((tool, index) => (
                <ListItem key={index} sx={{ fontWeight: "medium" }}>{tool}</ListItem>
              ))}
            </List>
          </Sheet>

          {/* Summary Section */}
          <Sheet variant="outlined" sx={sectionStyle}>
            <Typography level="h4" sx={headingStyle}>Summary</Typography>
            <Typography style={{whiteSpace: 'pre-line'}} level="body1">{summary}</Typography>
          </Sheet>

          {/* My Role Section */}
          <Sheet variant="outlined" sx={sectionStyle}>
            <Typography level="h4" sx={headingStyle}>My Role</Typography>
            <Typography style={{whiteSpace: 'pre-line'}} level="body1">{role}</Typography>
          </Sheet>

          {/* Demonstration Button */}
          {demoLink && (
            <Button 
              variant="solid" 
              color="primary" 
              sx={buttonStyle}
              component="a" 
              href={demoLink} 
              target="_blank"
            >
              🚀 View Demo
            </Button>
          )}
        </Grid>

        {/* Right Side - Images */}
        <Grid xs={12} md={5}>
          <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md", height: "100%" }}>
            <Typography level="h4" sx={headingStyle}>Project Screenshots</Typography>
            {images.map((image, index) => (
              <Card key={index} sx={{ mb: 2, borderRadius: "lg", overflow: "hidden", boxShadow: "md" }}>
                <AspectRatio ratio="16/9">
                  <img src={URL_BASE +image} alt={`Screenshot ${index + 1}`} style={{ objectFit: "cover" }} />
                </AspectRatio>
              </Card>
            ))}
          </Sheet>
        </Grid>
      </Grid>
    </Sheet>
  );
};

/* Reusable Styles */
const sectionStyle = {
  p: 3,
  mb: 2,
  borderRadius: "lg",
  backgroundColor: "white",
  boxShadow: "sm",
};

const headingStyle = {
  mb: 1,
  fontWeight: "bold",
  color: "primary.600",
};

const buttonStyle = {
  mt: 3,
  width: "100%",
  fontSize: "1.1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  transition: "all 0.3s ease-in-out",
  "&:hover": { transform: "scale(1.05)" },
};

export default PortfolioProject;
