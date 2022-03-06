import * as E from 'fp-ts/Either';
import * as D from 'io-ts/Decoder';

import { BACKEND_URL_STORAGE_KEY } from "./Settings";
import axios from "axios";
import { SearchResponseList, searchResponseListDecoder } from "./SearchResponseModelDecoder";

export function search(
  origin: string,
  destination: string,
  departure: string,
  onSuccess: (response: E.Either<D.DecodeError, SearchResponseList>) => void,
  onFail: (e: any) => void
): void {
  const data = { origin, destination, departure };
  const apiUrl = window.localStorage.getItem(BACKEND_URL_STORAGE_KEY);

  axios
    .get(`${apiUrl}/search`, {
      headers: { accept: "application/json" },
      params: data,
    })
    .then((res) => onSuccess(searchResponseListDecoder.decode(res.data)))
    .catch((e) => onFail(e));
}

export function whisper(
  text: string,
  onSuccess: (response: string[]) => void,
  onFail: (e: any) => void
): void {
  const data = { text };
  const apiUrl = window.localStorage.getItem(BACKEND_URL_STORAGE_KEY);

  axios
    .get(`${apiUrl}/whisper`, {
      headers: { accept: "application/json" },
      params: data,
    })
    .then((res) => onSuccess(res.data))
    .catch((e) => onFail(e));
}
