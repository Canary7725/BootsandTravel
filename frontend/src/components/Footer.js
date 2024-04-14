import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { theme } from "../assets/Colors";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4,
        width: "100%",
        backgroundColor: "secondary.main",
        bgcolor: theme.palette.primary.main,
        py: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          //   bgcolor: "white",
          color: theme.palette.secondary.main,
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Boots and Travel</Typography>
            <Typography sx={{ fontSize: 12, textAlign: "center" }}>
              &copy; All Rights Reserved
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ fontSize: "24px", mt: 2 }}>
              <a
                href="#YOUR_FACEBOOK_LINK"
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                <FaFacebook />
              </a>
              <Box display="inline-block" mx={2} />
              <a
                href="#YOUR_INSTAGRAM_LINK"
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                <FaInstagram />
              </a>
              <Box display="inline-block" mx={2} />
              <a
                href="#YOUR_TWITTER_LINK"
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                <FaTwitter />
              </a>
              <Box display="inline-block" mx={2} />
              <a
                href="#YOUR_LINKEDIN_LINK"
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                <FaLinkedin />
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
