import boto3

s3 = boto3.client(
    service_name="s3",
    endpoint_url='https://56e5a2e41dcf1100e8cb5495a78d03de.r2.cloudflarestorage.com',
    aws_access_key_id='c1f51b6cadd1df4ef5608f6e71b97d7e',
    aws_secret_access_key='ae364514fa80abd53f22f8210cb6af18d7b786eb1af239beb17ebe0bfc96a381',
    region_name="auto"
)

bucket_name = "tung"


def upload_file(filename, binary_data):
    s3.upload_fileobj(binary_data, bucket_name, filename)


def upload_file_path(filepath, filename):
    with open(filepath, "rb") as f:
        upload_file(filename, f)
