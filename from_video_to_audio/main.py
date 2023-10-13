from fastapi import FastAPI
import requests
from moviepy.video.io.VideoFileClip import VideoFileClip
import file_server

app = FastAPI()


def get_local_file_path(filename):
    return f"./video/{filename}"


def get_mp3_output_local_file_path(filename):
    return f"./video/out/{filename}.mp3"


def download_video(url, filename):
    print(f"Start download {url}, filename {filename} to disk")
    response = requests.get(url)
    print(f"Download file {filename} success")
    with open(get_local_file_path(filename), mode="wb") as file:
        file.write(response.content)
        print(f"Write file {filename} to disk success")


def from_video_to_audio(filename):
    video_clip = VideoFileClip(get_local_file_path(filename))
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(get_mp3_output_local_file_path(filename))
    video_clip.close()
    audio_clip.close()

    print(f"Convert video to audio success, mp3 stored at {get_mp3_output_local_file_path(filename)}")


@app.get("/")
def index():
    return {"Hello": "World"}


@app.post("/")
def main(video_url: str, filename: str):
    download_video(video_url, filename)
    from_video_to_audio(filename)

    mp3_filename = f"{filename}.mp3"
    file_server.upload_file_path(get_mp3_output_local_file_path(filename), mp3_filename)

    return {"success": True, "mp3_url": f"https://pub-bcd7097428a04fc2bbd9b2e8a978b1bb.r2.dev/{mp3_filename}"}
