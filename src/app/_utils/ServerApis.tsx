import axios from "axios";

//Live server key
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
//Local server key
// const API_KEY =
//   "3d0eaddae1512a13c7a0f51be287f541a25d91f108dfe20e0dd475063234b19ba1709bdba9089643e515dfd715f1126b9fd601f424703079a12fd6d47d0626574000500e5f9a77ed237a260845a248b2a3e90c69baedda3656de4abc36c9cf0528737688d4f1abfb135f9d1d5a1affe2a3c75f297cd33f1d7ea17ee31680a993";
// const axiosClient = axios.create({
//   baseURL: `http://localhost:1337/api`,
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

/**
 * Fetch data from the specified endpoint.
 * @param endpoint - The API endpoint to call.
 * @returns The response data or an error message.
 */
export async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await axiosClient.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error as needed
  }
}
