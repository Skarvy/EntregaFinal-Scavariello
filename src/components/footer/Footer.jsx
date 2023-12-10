import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'warning.light',
        p: 6,
        mt: 5,
        mb: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {[
            {
              title: 'About Us',
              content: 'We are XYZ company, dedicated to providing the best service to our customers.',
            },
            {
              title: 'Contact Us',
              content: '123 Main Street, Anytown, USA\nEmail: info@example.com\nPhone: +1 234 567 8901',
            },
            {
              title: 'Follow Us',
              content: (
                <>
                  <Link href="https://www.facebook.com/" color="inherit">
                    <Facebook />
                  </Link>
                  <Link href="https://www.instagram.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
                    <Instagram />
                  </Link>
                  <Link href="https://www.twitter.com/" color="inherit">
                    <Twitter />
                  </Link>
                </>
              ),
            },
          ].map((section, index) => (
            <Grid key={index} item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {section.content}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
