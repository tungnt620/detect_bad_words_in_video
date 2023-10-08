from rq import Queue
from redis import Redis
from fastapi import FastAPI
from job import process_job

app = FastAPI()


redis_conn = Redis()
q = Queue(connection=redis_conn)


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def submit_job(collection_id: str, record_id: str, video_url: str, filename: str):
    q.enqueue(process_job, collection_id, record_id, video_url, filename)
    print(f"Submit job successes, {collection_id} {record_id} {video_url} {filename}")

    return {"success": True}
