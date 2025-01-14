import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000', // Replace with your API's base URL
  timeout: 10000, // Timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token Retrieval Helper
const getToken = async (): Promise<string | null> => {
  try {
    return await '';
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

// Generic Axios Call
export const apiRequest = async <T>(
  endpoint: string,
  method: AxiosRequestConfig['method'],
  data?: T,
  requiresAuth: boolean = true
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      data: JSON.stringify(data),
    };

    // Include Authorization header if required
    if (requiresAuth) {
      const token = await getToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        throw new Error('Authentication token missing');
      }
    }

    // Make the request
    const response = await apiClient(config);
    console.log('response:', response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    throw new Error(errorMessage);
  }
};
