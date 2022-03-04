import { SearchResponseItem } from "./models";
import { BACKEND_URL_STORAGE_KEY } from "./Settings";
import axios from "axios";

export function search(
  origin: string,
  destination: string,
  departure: string,
  onSuccess: (response: SearchResponseItem[]) => void,
  onFail: (e: any) => void
): void {
  const data = { origin, destination, departure };
  const apiUrl = window.localStorage.getItem(BACKEND_URL_STORAGE_KEY);

  axios
    .get(`${apiUrl}/search`, {
      headers: { "accept": "application/json" },
      params: data,
    })
    .then((res) => onSuccess(res.data))
    .catch((e) => onFail(e));
}
