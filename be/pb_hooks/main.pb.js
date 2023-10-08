function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

onModelAfterCreate((e) => {
    const jobId = e.model.get('id')
    console.log("Job created, id=", jobId)

    const videoUrl = `http://127.0.0.1:8090/api/files/jobs/${jobId}/${e.model.get('video')}`
    console.log(`Video url ${videoUrl}`)

    try {
        const res = $http.send({
            url: "http://127.0.0.1:8080/?collection_id=jobs&record_id=" + jobId + "&filename=" + e.model.get('video') + "&video_url=" + encodeURIComponent(videoUrl),
            method: "POST",
        })

        if (res.statusCode == 200) {
            console.log("Send request to worker successes");
        }
    } catch (err) {
        console.error("Send request to worker failed", err);
    }
}, "jobs")
