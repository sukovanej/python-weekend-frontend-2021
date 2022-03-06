from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/whisper")
def whisper(text: str):
    return [f"{text} {i}" for i in range(random.randint(0, 10))]


from pydantic import BaseModel


class SearchResponse(BaseModel):
    origin: str
    destination: str
    arrival_time: str
    departure_time: str


@app.get("/search")
def search(origin: str, destination: str, departure: str) -> list[SearchResponse]:
    return [
        SearchResponse(
            origin=origin,
            destination=destination,
            arrival_time=departure,
            departure_time="departure_ime"
        )
    ]
