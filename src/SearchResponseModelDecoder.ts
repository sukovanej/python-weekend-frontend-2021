import * as D from 'io-ts/Decoder';

export const searchResponseDecoder = D.struct({
  origin: D.string,
  destination: D.string,
  departure: D.string,
  arrival: D.string,
});

export const searchResponseListDecoder = D.array(searchResponseDecoder);

export type SearchResponseItem = D.TypeOf<typeof searchResponseDecoder>;
export type SearchResponseList = D.TypeOf<typeof searchResponseListDecoder>;
