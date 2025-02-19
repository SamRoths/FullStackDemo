import React from "react";
import { Box, Typography, Sheet, Button, List, ListItem, Card, AspectRatio, Grid } from "@mui/joy";
import { URL_BASE } from "../../Constants";

const ProjectPage = ({ title='', context='', tools=[], summary='',role='', demoLink='/', images=[] }) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 4,
        p: 3,
        borderRadius: "lg",
        boxShadow: "lg",
      }}
    >
      {/* Project Title at the Top */}
      <Typography level="h2" sx={{ textAlign: "center", mb: 3 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        {/* Left Side - Project Info */}
        <Grid xs={12} md={7}>
          {/* Context Section */}
          <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Context
            </Typography>
            <Typography level="body1">{context}</Typography>
          </Sheet>

          {/* Tools Section */}
          <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Tools Used
            </Typography>
            <List>
              {tools.map((tool, index) => (
                <ListItem key={index}>{tool}</ListItem>
              ))}
            </List>
          </Sheet>

          {/* Summary Section */}
          <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Summary
            </Typography>
            <Typography level="body1">{summary}</Typography>
          </Sheet>

          {/* My Role Section */}
          <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              My Role
            </Typography>
            <Typography level="body1">{role}</Typography>
          </Sheet>

          {/* Demonstration Section */}
          {demoLink && (
            <Button 
              variant="solid" 
              color="primary" 
              sx={{ mt: 2 }} 
              component="a" 
              href={demoLink} 
              target="_blank"
            >
              View Demo
            </Button>
          )}
        </Grid>

        {/* Right Side - Images */}
        <Grid xs={12} md={5}>
          <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Project Screenshots
            </Typography>
            {images.map((image, index) => (
              <Card key={index} sx={{ mb: 1, borderRadius: "md" }}>
                <AspectRatio ratio="16/9">
                  <img src={URL_BASE + image} alt={`Screenshot ${index + 1}`} style={{ borderRadius: "md" }} />
                </AspectRatio>
              </Card>
            ))}
          </Sheet>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default ProjectPage;
