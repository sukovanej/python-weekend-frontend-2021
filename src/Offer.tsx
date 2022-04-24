import { SearchResponseItem } from "./SearchResponseModelDecoder";

interface OfferProps {
  offer: SearchResponseItem;
}

export default function Offer({ offer }: OfferProps) {
  return (
    <div className="offer-block">
      <h1>
        {offer.origin} - {offer.destination} ({offer.departure})
      </h1>
      <p>
      Departure: {offer.departure} <br/>
      Arrival: {offer.arrival} <br/>
      From: {offer.origin} <br/>
      To: {offer.destination}
      </p>
    </div>
  );
}
