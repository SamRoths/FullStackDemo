import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';

const PortfolioPreviewCard = ({ title, date, image, description, link }) => {
  return (
    <Card 
      variant="outlined" 
      sx={{  boxShadow: 'md', borderRadius: 'lg', cursor: 'pointer' }}
      onClick={() => window.location.href = link}
    >
      <AspectRatio minHeight="120px" maxHeight="300px">
          <img src={image} alt={title} loading="lazy" />
      </AspectRatio>
      <CardContent sx={{ bgcolor: 'background.surface', padding: 2 }}>
        <Typography level="title-lg" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography level="body-sm" textColor="text.secondary" sx={{ mb: 1 }}>
          {date}
        </Typography>
        <Typography level="body-md" textColor="text.primary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PortfolioPreviewCard;
