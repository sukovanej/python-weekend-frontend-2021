import Offer from "./Offer";
import { SearchResponseItem } from "./SearchResponseModelDecoder";

interface OffersProps {
  offers: SearchResponseItem[] | null;
}

export default function Offers({ offers }: OffersProps): JSX.Element {
  if (offers == null) {
    return <div>Nothing there yet</div>;
  }

  const elements = offers.map((offer: SearchResponseItem) => (
    <Offer offer={offer} />
  ));

  return <div>{elements}</div>;
}
