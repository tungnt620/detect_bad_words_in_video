import requests
from google.cloud import speech
import os


class ExtractTextFromVideoService:
    def __init__(self) -> None:
        self.audio_path = './audio'
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google_secret_key.json"

    def download_audio(self, url):
        filename = url.split('/')[-1]

        audio_file_path = self.audio_path + '/' + filename

        print(f"Start download {url}, filename {filename} to disk")
        response = requests.get(url)
        print(f"Download file {filename} success")
        with open(audio_file_path, mode="wb") as file:
            file.write(response.content)
            print(f"Write file {filename} to disk success")

        return audio_file_path

    def extract(self, audio_url):
        client = speech.SpeechClient()
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
            language_code='vi-VN'
        )

        download_audio_path = self.download_audio(audio_url)
        with open(download_audio_path, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)
        response = client.recognize(config=config, audio=audio)

        print(response.results)

        text = ''
        for result in response.results:
            text = result.alternatives[0].transcript

        return text
