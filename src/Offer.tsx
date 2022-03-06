import { SearchResponseItem } from "./SearchResponseModelDecoder";

interface OfferProps {
  offer: SearchResponseItem;
}

export default function Offer({ offer }: OfferProps) {
  return (
    <div>
      <img
        src="delimiter.png"
        alt="_"
        className="center"
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <h1>
        {offer.origin} - {offer.destination}
      </h1>
      ({offer.departure} - {offer.arrival})
    </div>
  );
}
