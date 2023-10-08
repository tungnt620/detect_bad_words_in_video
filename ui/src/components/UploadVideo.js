import React, {useState} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {message, Spin, Upload} from 'antd';
import {pb} from "../utils";

const {Dragger} = Upload;

const UploadVideo = () => {
    const [uploading, setUploading] = useState(false)

    const onChange = async (info) => {
        setUploading(true);
        console.log("File", info.file)

        const formData = new FormData();
        formData.append("video", info.file)
        formData.append("file_name", info.file.name)
        formData.append("status", "pending")

        const createdJob = await pb.collection('jobs').create(formData);

        setUploading(false);
        console.log("Submit job successes, job: ", createdJob)
        message.success(`Video ${info.file.name} uploaded successfully. It processing now, please wait for result`);
    }

    return (
        <Dragger
            name='file'
            onChange={onChange}
            beforeUpload={() => false}
            disabled={uploading}
            fileList={[]}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support file in .mp4 format
            </p>
            {uploading && <Spin/>}

        </Dragger>
    );
}

export default UploadVideo;
