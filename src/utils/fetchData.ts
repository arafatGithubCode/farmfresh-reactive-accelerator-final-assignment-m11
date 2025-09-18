import { catchErr } from "./catchErr";

export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return catchErr(error);
  }
};
