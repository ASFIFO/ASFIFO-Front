import axios from "axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";

type StorageKind = "local" | "session";

const stores = () => [localStorage, sessionStorage];

export const getAuthToken = () =>
  localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

export const getAuthUser = () => {
  const rawUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const setAuthSession = (
  token: string,
  user: unknown,
  storageKind: StorageKind = "session"
) => {
  clearAuthSession();

  const storage = storageKind === "local" ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthSession = () => {
  stores().forEach((storage) => {
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(USER_KEY);
  });

  delete axios.defaults.headers.common.Authorization;
};
