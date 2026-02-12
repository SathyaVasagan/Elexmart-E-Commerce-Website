import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const createOrder = async (amount) => {
  try {
    const { data } = await axios.post(`${API_URL}/payment/order`, { amount });
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const { data } = await axios.post(`${API_URL}/payment/verify`, paymentData);
    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
