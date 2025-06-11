import { getItemFromLocalStorage } from "@src/api/utils";

export const getAccessToken = () => {
  const { token } = getItemFromLocalStorage("accessToken") || { token: null };

  return token;
};
