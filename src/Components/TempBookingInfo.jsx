import React, { useState } from "react";
import { useBooking } from "../Contexts/BookingContext";
import { createBooking } from "../Services/BookingService";
import {
  CircularProgress,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

export default function TempBookingInfo() {
  const { bookingData } = useBooking();
  const { selectedDateTime } = useBooking();
  const { table } = useBooking();
  const { amount } = useBooking();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const booking = {
    TableId: table.tableId,
    CustomerEmail: bookingData.email,
    CustomerName: bookingData.name,
    CustomerPhone: bookingData.phone,
    Amount: amount,
    StartAt: new Date(selectedDateTime).toISOString(),
  };

  const handleCreateBooking = async (e) => {
    setConfirmation("");
    setError("");
    setLoading(true);
    e.preventDefault();
    try {
      const data = await createBooking(booking);
      setConfirmation("Booking created successfully!");
      setSnackbarOpen(true); // Show success snackbar
    } catch (error) {
      console.error("Error creating booking: ", error);
      setError("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Booking Confirmation
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Booking Details
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {bookingData?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {bookingData?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {bookingData?.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Date & Time:</strong> {selectedDateTime}
          </Typography>
          <Typography variant="body1">
            <strong>Number of People:</strong> {amount}
          </Typography>
          <Typography variant="body1">
            <strong>Table:</strong> {table?.tableNumber}
          </Typography>
        </CardContent>
      </Card>

      <Box component="form" onSubmit={handleCreateBooking}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ minWidth: 150 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Booking"
          )}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Booking created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
