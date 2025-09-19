import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7099/api/",
});

export const getTables = async (startTime, amount) => {
  const response = await api.get("Booking/GetAvailableTables", {
    params: {
      startTime: startTime.toISOString(),
      amount: amount,
    },
  });
  console.log(response);
  return response.data.data;
};
