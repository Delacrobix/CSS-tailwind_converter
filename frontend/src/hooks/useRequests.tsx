import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DataFromAPI } from "../utils/types";

type UseRequestsType = {
  data: DataFromAPI | null;
  loading: boolean;
  error: Error | null;
  sendRequest: (config: AxiosRequestConfig) => Promise<void>;
};

export default function UseRequests(): UseRequestsType {
  const [data, setData] = React.useState<DataFromAPI | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  async function sendRequest(config: AxiosRequestConfig) {
    console.log("Sending request...");
    setLoading(true);
    try {
      const response: AxiosResponse<DataFromAPI> = await axios(config);

      setData(response.data);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, sendRequest };
}
