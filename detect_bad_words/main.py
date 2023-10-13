from fastapi import FastAPI

from classifiers.ExplainableLSTM import ExplainableLSTM
from classifiers import ExplainableAttentionLSTM

app = FastAPI()


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def detect_bad_words(text: str):
    print(f"Start process text with length = {len(text)}")

    glove = ExplainableLSTM.load_glove_wordvectors('./wordvectors/cc.vi.300.vec')
    lstm_att = ExplainableAttentionLSTM.ExplainableAttentionLSTM.import_model('./trained_models/att_lstm_tc', glove)

    explanation = lstm_att.explain(text)
    print(text)
    print(explanation[0])
    return {"success": True, 'explanation': explanation[0]}
