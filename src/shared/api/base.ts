import axios from "axios";
import { API_URL } from "~/shared/config";

export const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});
async function getValidToken() {
  return null;
}
