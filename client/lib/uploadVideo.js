import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucket = new AWS.S3({
  params: { Bucket: process.env.AWS_S3_BUCKET_NAME },
  region: process.env.AWS_S3_BUCKET_REGION,
});

const upload = (file, onUpdate) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.name,
  };

  bucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
      onUpdate(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      if (err) console.log(err);
    });
};

export default upload;
