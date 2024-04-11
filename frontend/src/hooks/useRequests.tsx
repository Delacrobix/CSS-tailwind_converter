import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type UseRequests<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  sendRequest: (config: AxiosRequestConfig) => Promise<void>;
};

export default function UseRequests<T>(): UseRequests<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  async function sendRequest(config: AxiosRequestConfig) {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios(config);
      setData(response.data);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, sendRequest };
}
