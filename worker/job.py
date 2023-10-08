import requests
import json


def update_job_progress(collection_id, record_id, update_data):
    url = f"http://127.0.0.1:8090/api/collections/{collection_id}/records/{record_id}"

    print(f"Update job progress, url {url}, update_data {update_data}")

    headers = {'content-type': 'application/json'}
    response = requests.patch(
        url,
        data=json.dumps(update_data),
        headers=headers
    )

    print(f"Update job progress completed, response {response.json()}")


def process_job(collection_id, record_id, video_url, filename):
    update_job_progress(collection_id, record_id, {
        "status": "doing"
    })
    print(f"Processing job {collection_id} {record_id} {video_url}")

    # Extract audio from video
    extract_audio_resp = requests.post(f"http://127.0.0.1:8000/?video_url={video_url}&filename={filename}")
    mp3_url = extract_audio_resp.json()["mp3_url"]

    update_job_progress(collection_id, record_id, {
        "mp3_url": mp3_url,
    })

    # TODO: from audio to text
    speech_to_text_response = requests.post(f"http://127.0.0.1:8001/?mp3_url={mp3_url}")
    text = speech_to_text_response.json()["text"]

    # TODO: detect bad words from text
    detect_bad_words_response = requests.post(f"http://127.0.0.1:8002/?text={text}")
    text_with_bad_words_highlight = detect_bad_words_response.json()["text_with_bad_words_highlighted"]

    update_job_progress(collection_id, record_id, {
        "status": "successes",
        "result": text_with_bad_words_highlight
    })

    pass
