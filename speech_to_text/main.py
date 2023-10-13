from fastapi import FastAPI

from service import ExtractTextFromVideoService

app = FastAPI()


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def from_audio_to_text(mp3_url: str):
    print(f"Start process {mp3_url}")

    text = ExtractTextFromVideoService().extract(mp3_url)

    return {"success": True, "text": text}
