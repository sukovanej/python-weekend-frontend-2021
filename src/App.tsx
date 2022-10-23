import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as D from 'io-ts/Decoder';

import { CSSProperties, useState } from "react";

import "./App.css";
import "./Tree.css";

import { Alert, Button, Container } from "react-bootstrap";

import { search } from "./api";

import SearchForm from "./SearchForm";
import Offers from "./Offers";
import Settings from "./Settings";
import Lizard from "./Lizard";
import Snowflakes from "./Snowflakes";
import { SearchResponseItem } from './SearchResponseModelDecoder';

const cubeSolveStyle: CSSProperties = {
  backgroundImage: "url(./cube.png)",
  backgroundPosition: "0px 0px",
};

const cubeUnsolvedStyle: CSSProperties = {
  backgroundImage: "url(./cube.png)",
  backgroundPosition: "0px 40px",
};

function setMilanTheme() {
  document.body.style.backgroundImage = "url(./milan.jpg)";
  document.body.style.backgroundSize = "100% auto";
}

function setChristmassTheme() {
  document.body.style.backgroundImage = "url(./dedove.jpg)";
  document.body.style.backgroundSize = "100% auto";
}

function setBrnoTheme() {
  document.body.style.backgroundImage = "url(./kun.jpeg)";
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
  const [brnoEnabled, setBrnoEnabled] = useState(false);
  const [barcelonaEnabled, setBarcelonaEnabled] = useState(false);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");

  const [milan, setMilan] = useState(false);

  const [fetchState, setFetchState] = useState<FetchState>("not-started");
  const [errorMessage, setErrorMessage] = useState("");

  if (christmassEnabled) {
    setChristmassTheme();
  } else if (milan) {
    setMilanTheme();
  } else if (brnoEnabled) {
    setBrnoTheme();
  } else {
    setNormalTheme();
  }

  const onSubmit = (
    origin: string,
    destination: string,
    departure: string
  ): void => {
    setFetchState("fetching");
    search(
      origin,
      destination,
      departure,
      (offers) => {
        pipe(
          offers,
          E.match(
            (err) => {
              setOffers([]);
              setFetchState("failed");
              setErrorMessage(`Decoding failed: ${D.draw(err)}`);
            },
            (offers) => {
              setOffers(offers);
              setFetchState("success");
            }
          )
        );

        if (destination.toLowerCase().includes("milan")) {
          setMilan(true)
        } else {
          setMilan(false)
        }
      },
      (e) => {
        setErrorMessage(`Search failed: ${JSON.stringify(e, null, 2)}`);
        setFetchState("failed");
      }
    );
  };

  const onWhisperFail = (e: any) =>
    setErrorMessage(`Whisper failed: ${JSON.stringify(e, null, 2)}`);

  const cubeStyle = christmassEnabled ? cubeSolveStyle : cubeUnsolvedStyle;

  return (
    <>
      <Lizard isEnabled={barcelonaEnabled}/>
      <div className="bg"></div>
      <Snowflakes />
      <div className="kiwi-color-top"></div>
      <Container>
        <div className="content-wrapper">
          <div style={{ margin: "0 auto" }}>
            <h1>Python weekend search</h1>
          </div>

          <div className="navbar">
            <img
              style={{ float: "left" }}
              src="https://images.kiwi.com/common/kiwicom-logo.svg"
              alt="kiwi-banner"
            />

            <div style={{ display: "flex" }}>
              <Settings />
              <div
                style={cubeStyle}
                className="cube"
                onClick={() => setChristmassEnabled(!christmassEnabled)}
              ></div>
              <div
                style={{
                  backgroundImage: "url(./brno-dick.png)",
                  backgroundPosition: "0px 40px",
                }}
                className="cube"
                onClick={() => setBrnoEnabled(!brnoEnabled)}
              ></div>
              <div
                  style={{
                    backgroundImage: "url(./barcelona.png)",
                    backgroundPosition: "0px 40px",
                  }}
                  className="cube"
                  onClick={() => setBarcelonaEnabled(!barcelonaEnabled)}
              ></div>
            </div>
          </div>

          <Alert
            variant="danger"
            style={{
              maxHeight: 300,
              overflowY: "auto",
              display: errorMessage === "" ? "none" : "block",
            }}
          >
            <Button
              variant="danger"
              style={{ float: "right" }}
              onClick={() => setErrorMessage("")}
            >
              Close
            </Button>
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
              onWhisperFail={onWhisperFail}
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
