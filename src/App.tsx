import { useState } from "react";

import "./App.css";
import "./Tree.css";

import { Alert, Button, Container } from "react-bootstrap";

import { SearchResponseItem } from "./models";

import { search } from "./api";

import SearchForm from "./SearchForm";
import Offers from "./Offers";
import Settings from "./Settings";
import Snowflakes from "./Snowflakes";

function setChristmassTheme() {
  document.body.style.backgroundImage = "url(http://localhost:3000/dedove.jpg)";
  document.body.style.backgroundSize = "100% auto";
}

function setNormalTheme() {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "#fff";
}

type FetchState = "not-started" | "fetching" | "success" | "failed";

function App() {
  const [offers, setOffers] = useState<null | SearchResponseItem[]>(null);
  const [christmassEnabled, setChristmassEnabled] = useState(false);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");

  const [fetchState, setFetchState] = useState<FetchState>("not-started");
  const [errorMessage, setErrorMessage] = useState("");

  if (christmassEnabled) {
    setChristmassTheme();
  } else {
    setNormalTheme();
  }

  const onSubmit = (
    origin: string,
    destination: string,
    departure: string,
  ): void => {
    setFetchState("fetching");
    search(origin, destination, departure, (offers) => {
      setOffers(offers);
      setFetchState("success");
    }, (e) => {
      setErrorMessage(JSON.stringify(e, null, 2));
      setFetchState("failed");
    });
  };

  return (
    <>
      <div className="bg"></div>
      <Snowflakes />
      <div className="kiwi-color-top"></div>
      <Container>
        <div className="content-wrapper">
          <div style={{ margin: "0 auto"}}>
            <h1>Python weekend search</h1>
          </div>

          <div className="navbar">
            <img style={{ float: "left" }} src="https://images.kiwi.com/common/kiwicom-logo.svg" alt="kiwi-banner" />

            <div>
              <Settings />
              <img src="cube.png" alt="cube" className="tree-btn" onClick={() => setChristmassEnabled(!christmassEnabled)} />
            </div>
          </div>

          <Alert variant="danger" style={{ display: fetchState === "failed" ? "block" : "none" }}>
            <Button variant="danger" style={{ float: "right" }} onClick={() => setFetchState("not-started")}>Close</Button>
            <pre>{errorMessage}</pre>
          </Alert>

          <div className="container-content">
            <SearchForm
              onSubmit={onSubmit}
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              departure={departure}
              setDeparture={setDeparture}
              fetchInProgress={fetchState === "fetching"}
            />
            <div style={{ height: 10 }}></div>
            <Offers offers={offers} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
