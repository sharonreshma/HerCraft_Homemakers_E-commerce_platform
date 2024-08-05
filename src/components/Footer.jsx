import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";

function Copyright(props) {
  return (
    <Typography variant="body2" color="rgb(255,255,255)" align="center" {...props}>
      {'Copyright © '}
      <Link color="rgb(255,255,255)" href="https://mui.com/">
        HerCraft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Decors', 'Crochets', 'Pottery', 'Candles', 'Boquets'],
  },
  {
    title: 'Resources',
    description: ['Source', 'About', 'randd@gmail.com', 'sampleus@gmail.com'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
          backgroundColor: "black",
          opacity: 70,
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly" marginLeft={5}>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" sx={{ color: 'pink' }} gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="rgb(255,255,255)">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <div className="footer-wrapper">
          <div className="footer-section-one">
            <div
              className="footer-icons"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '35px',
                marginTop: '16px',
              }}
            >
              <BsTwitter className="social-icon" />
              <SiLinkedin className="social-icon" />
              <BsYoutube className="social-icon" />
              <FaFacebookF className="social-icon" />
            </div>
          </div>
        </div>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <style>
        {`
          .social-icon {
            font-size: 24px;
            color: #FFCCCC;
            transition: transform 0.2s ease;
          }
          
          .social-icon:active {
            transform: scale(1.2);
          }
        `}
      </style>
    </ThemeProvider>
  );
}
