import { useState } from "react";

import "./App.css";
import "./Tree.css";

import { Container } from "react-bootstrap";

import { SearchResponse } from "./models";

import { search } from "./api";

import SearchForm from "./SearchForm";
import Offers from "./Offers";

import { DepthOfFieldSnowfall } from 'react-snowflakes';

function App() {
  const [offers, setOffers] = useState<null | SearchResponse>(null);

  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");

  const [fetchInProgress, setFetchInProgress] = useState(false);

  const onSubmit = (
    origin: string,
    destination: string,
    departure: string,
  ): void => {
    setFetchInProgress(true);
    search(origin, destination, departure, (offers) => {
      setOffers(offers);
      setFetchInProgress(false);
    });
  };

  if (fetchInProgress) {
    return <div>Searching...</div>;
  }

  return (
    <>
      <DepthOfFieldSnowfall count={150}
        style={{
          // Position must be relative or absolute,
          // because snowflakes are positioned absolutely.
          color: '#fff',
          position: 'absolute',
          width: '95%',
          height: '95%',
          zIndex: '-1',
          backgroundColor: "235E6F",
        }} />

      <Container>
        <div className="content-wrapper">
          <div className="xmas-tree-left"><div className="xmasTree"></div></div>
          <div className="xmas-tree-right"><div className="xmasTree"></div></div>
          
          <div className="navbar">
            <h1>Christmas adventures</h1>
          </div>
          <div className="container-content">
            <SearchForm
              onSubmit={onSubmit}
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              departure={departure}
              setDeparture={setDeparture}
            />
            <Offers offers={offers} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
