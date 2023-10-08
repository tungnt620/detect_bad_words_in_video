
## Create virtual environment
Use python 3.11
```bash
pip install -r requirements.txt
```

## Start from video to audio service
```bash
mkdir -p from_video_to_audio/video/out
cd from_video_to_audio && uvicorn main:app --reload --port 8000
```
Access swagger at http://localhost:8000/docs

## Start worker service

Start redis server at localhost, port 6379 (easy way: run redis server in docker and forward port 6379 to localhost)
```bash
cd worker && uvicorn main:app --reload  --port 8080
cd worker && rq worker --with-scheduler
```
Access swagger at http://localhost:8080/docs

## Start UI
```bash
cd ui && npm install
cd ui && npm start
```
Access UI at http://localhost:3000


## Start BE service
`cd be && ./pocketbase serve`

Access BE admin at http://127.0.0.1:8090/_/

Credential `test@gmail.com/gJeH4yUdXV73zWwE29oU6gta8DfnVOss`
