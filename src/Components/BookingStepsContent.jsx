import SelectDateAndTime from "./SelectDateAndTime";
import GiveContactInfo from "./GiveContactInfo";
import SelectTable from "./SelectTable";
import TempBookingInfo from "./TempBookingInfo";
import SelectAmount from "./SelectAmount";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CircularProgress, Alert } from "@mui/material";
import { useBooking } from "../Contexts/BookingContext";
import { createBooking } from "../Services/BookingService";

const BookingStepsContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { bookingData, selectedDateTime, table, amount } = useBooking();

  const steps = [
    "Contact Information",
    "Select date and time",
    "Amount of People",
    "Select Table",
    "Confirmation",
  ];

  const mobileSteps = ["Contact", "Date & Time", "Amount", "Table", "Confirm"];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      await handleFinishBooking();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleFinishBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const booking = {
        TableId: table.tableId,
        CustomerEmail: bookingData.email,
        CustomerName: bookingData.name,
        CustomerPhone: bookingData.phone,
        Amount: amount,
        StartAt: new Date(selectedDateTime).toISOString(),
      };

      await createBooking(booking);
      setBookingComplete(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBookingComplete(false);
    setError("");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <GiveContactInfo />;
      case 1:
        return <SelectDateAndTime />;
      case 2:
        return <SelectAmount />;
      case 3:
        return <SelectTable />;
      case 4:
        return <TempBookingInfo />;
      default:
        return "Unknown step";
    }
  };

  const currentSteps = isMobile ? mobileSteps : steps;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          minHeight: { xs: "31.25em", sm: "37.5em" },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          textAlign="center"
          sx={{ mb: { xs: 2, sm: 4 } }}
        >
          Restaurant Booking
        </Typography>

        <Stepper
          activeStep={activeStep}
          sx={{
            mb: { xs: 2, sm: 4 },
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
            "& .MuiStepConnector-line": {
              display: { xs: "none", sm: "block" },
            },
          }}
          orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
        >
          {currentSteps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box
          sx={{
            minHeight: { xs: "18.75em", sm: "25em" },
            mb: { xs: 2, sm: 4 },
          }}
        >
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 3 }}>
                {bookingComplete
                  ? "Booking completed successfully!"
                  : "All steps completed!"}
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={handleReset}
              >
                Start Over
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ mb: { xs: 2, sm: 4 } }}>
                {renderStepContent(activeStep)}
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: { xs: 2, sm: 3 },
                  borderTop: 1,
                  borderColor: "divider",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  size={isMobile ? "medium" : "large"}
                  fullWidth={isMobile}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  size={isMobile ? "medium" : "large"}
                  fullWidth={isMobile}
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : activeStep === steps.length - 1 ? (
                    "Finish"
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingStepsContent;
