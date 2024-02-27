import axios from "@/api";

// Types
import { User } from "@/types";

// URLs
import * as URL from "./urls";

export const getAccount = async (): Promise<User> => {
  return axios.get(URL.ACCOUNT_URL).then((response) => response.data);
};

export const updateAccount = async (data: FormData): Promise<User> => {
  return axios.put(URL.ACCOUNT_URL, data).then((response) => response.data);
};
