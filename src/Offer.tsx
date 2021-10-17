import { SearchResponseItem } from "./models";

interface OfferProps {
  offer: SearchResponseItem;
}

export default function Offer({ offer }: OfferProps) {
  return (
    <div>
      <img src="delimiter.png" className="center" style={{marginTop: 20, marginBottom: 20}} />
      <h1>{offer.origin} - {offer.destination}</h1>
      ({offer.departure} - {offer.arrival})
    </div>
  );
}
