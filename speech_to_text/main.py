from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def from_audio_to_text(mp3_url: str):
    print(f"Start process {mp3_url}")

    # TODO: add logic here

    return {"success": True, "text": "text from audio"}
