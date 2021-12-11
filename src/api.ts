import { SearchResponse } from "./models";
import axios from "axios";

const API_URL = "http://192.168.0.38:8000";

export function search(
  origin: string,
  destination: string,
  departure: string,
  onSuccess: (response: SearchResponse) => void
): void {
  let formData = new FormData();
  formData.append("origin", origin);
  formData.append("destination", destination);
  formData.append("departure", departure);

  axios
    .post(`${API_URL}/search`, formData, {
      method: "post",
      headers: { "accept": "application/json" },
    })
    .then((res) => onSuccess(res.data));
}
