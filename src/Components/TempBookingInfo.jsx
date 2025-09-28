import React from "react";
import { useBooking } from "../Contexts/BookingContext";
import { Typography, Card, CardContent, Box } from "@mui/material";

export default function TempBookingInfo() {
  const { bookingData, selectedDateTime, table, amount } = useBooking();

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
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Name:</strong> {bookingData?.name || "Not provided"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {bookingData?.email || "Not provided"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> {bookingData?.phone || "Not provided"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Date & Time:</strong> {selectedDateTime || "Not selected"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Number of People:</strong> {amount || "Not selected"}
          </Typography>
          <Typography variant="body1">
            <strong>Table:</strong>{" "}
            {table?.tableNumber ? `Table ${table.tableNumber}` : "Not selected"}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ p: 2, backgroundColor: "primary.light", borderRadius: 1 }}>
        <Typography variant="body2" color="primary.contrastText">
          Please review your booking details above. Click "Finish" to complete
          your reservation.
        </Typography>
      </Box>
    </div>
  );
}
