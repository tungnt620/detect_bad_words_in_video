import React, {useEffect, useState} from 'react';
import {Space, Table, Tag} from 'antd';
import {pb} from "../utils";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Created at',
        dataIndex: 'created',
        key: 'created',
    },
    {
        title: 'Video',
        dataIndex: 'video',
        key: 'age',
        render: (_, {id, video, file_name}) => {
            return <a
                target={'_blank'}
                href={`http://127.0.0.1:8090/api/files/jobs/${id}/${video}`}
            >
                {file_name || video}
            </a>
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, {status}) => {
            return <Tag color={status === "pending" ? "blue" : "green"}>{status}</Tag>
        }
    },
    {
        title: "Audio",
        dataIndex: "mp3_url",
        key: "mp3_url",
        render: (_, {mp3_url}) => {
            if (mp3_url) {
                return <a target={'_blank'} href={mp3_url}>Audio</a>
            }

            return null;
        }
    },
    {
        title: 'View result',
        key: 'action',
        render: (_, record) => {
            if (["failed", "successes"].includes(record.status)) {
                return (
                    <Space size="middle">
                        <a>View</a>
                    </Space>
                )
            }

            return null;
        },
    },
];

const JobTable = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const getJobs = async () => {
            let jobsData = await pb.collection('jobs').getList(1, 1000, {sort: '-created'})
            setJobs(jobsData.items)
        }

        getJobs()
    }, []);

    useEffect(() => {
        pb.collection('jobs').subscribe('*', function (e) {
            console.log("Updated event from server", e);

            const updatedJob = e.record;
            const index = jobs.findIndex(job => job.id === updatedJob.id);
            if (index !== -1) {
                let newJobs = [...jobs];
                newJobs[index] = updatedJob;
                setJobs(newJobs);
            } else {
                setJobs([updatedJob, ...jobs]);
            }
        });
    }, []);

    return <Table columns={columns} dataSource={jobs}/>;
}

export default JobTable;