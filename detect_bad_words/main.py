from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def detect_bad_words(text: str):
    print(f"Start process text with length = {len(text)}")

    # TODO: add logic here

    return {"success": True, "text_with_bad_words_highlighted": "text with bad words highlighted"}
