import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URI;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: authToken,
  },
});

export const executeQuery = async (queries: any[]): Promise<any> => {
  try {
    const response = await apiClient.post("", {
      query: queries,
      queryType: "multi",
    });
    return response.data?.results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

export default apiClient;
