import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textTransform: "uppercase",
                mb: 2,
                fontWeight: 600,
              }}
            >
              Restaurant SYB
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Din restaurang i Stockholm. Klassiska rätter och moderna smaker.
              Your restaurant in Stockholm. Classic dishes and modern flavors.
              Book a table easily online or call us directly.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textTransform: "uppercase",
                mb: 2,
                fontWeight: 600,
              }}
            >
              Open Hours
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Mon–Sun: 10:00 – 22:00
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textTransform: "uppercase",
                mb: 2,
                fontWeight: 600,
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">Storgatan 10, Stockholm</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">08-123 456 78</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">info@restaurantsyb.se</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 3,
            borderColor: theme.palette.grey[700],
          }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.grey[400],
              fontSize: "0.875rem",
            }}
          >
            &copy; 2025 - Restaurant SYB | ALL RIGHTS RESERVED
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
