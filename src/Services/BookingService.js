import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7099/api/",
});

export const getTables = async (startTime, amount) => {
  if (!startTime || !(startTime instanceof Date)) {
    throw new Error("startTime must be a valid Date object");
  }

  if (!amount || amount <= 0) {
    throw new Error("amount must be a positive number");
  }
  console.log({ startTime: startTime.toISOString(), amount });
  try {
    const response = await api.get("Booking/GetAvailableTables", {
      params: {
        startTime: startTime.toISOString(),
        amount: amount,
      },
    });

    if (!response.data?.data) {
      throw new Error("Invalid response format from API");
    }
    console.log("Fetched tables:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch available tables:", {
      startTime: startTime?.toISOString(),
      amount,
      error: error.message || error,
    });

    throw new Error(`Failed to get available tables: ${error.message}`);
  }
};
