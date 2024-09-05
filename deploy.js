require('dotenv').config();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Configure AWS with your access and secret key from environment variables.
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Your S3 bucket name.
const bucketName = process.env.AWS_S3_BUCKET;

// The local directory you want to upload.
const buildDirectory = path.join(__dirname, 'build');

// Function: Upload file to S3
const uploadFile = async (filePath, s3Bucket, s3Key) => {
  const fileContent = fs.readFileSync(filePath);
  
  const uploadParams = {
    Bucket: s3Bucket,
    Key: s3Key,
    Body: fileContent
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`Uploaded ${s3Key} from path ${filePath}`);
  } catch (err) {
    console.error(`Error uploading ${s3Key}: `, err);
  }
};

// Function: Upload directory to S3
const uploadDirectory = async (srcDir, s3Bucket, srcDirPrefix = '') => {
  const files = fs.readdirSync(srcDir);
  console.log(`Uploading files in ${srcDir}:`, files);
  await Promise.all(files.map(async (file) => {
    const fullPath = path.join(srcDir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      await uploadDirectory(fullPath, s3Bucket, path.join(srcDirPrefix, file));
    } else {
      const s3Key = path.join(srcDirPrefix, file);
      await uploadFile(fullPath, s3Bucket, s3Key);
    }
  }));
};

// Start upload
uploadDirectory(buildDirectory, bucketName)
  .then(() => console.log('Upload complete!'))
  .catch((err) => console.error('Error uploading files:', err));
  