require('dotenv').config();
const { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // To determine the correct MIME type

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
  const contentType = mime.lookup(filePath) || 'application/octet-stream'; // Determine the correct MIME type

  const uploadParams = {
    Bucket: s3Bucket,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType, // Set the Content-Type header
    CacheControl: 'public, max-age=31536000' // Optional: Set Cache-Control header
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`Uploaded ${s3Key} from path ${filePath} with Content-Type ${contentType}`);
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
      const s3Key = path.join(srcDirPrefix, file).replace(/\\/g, '/'); // Ensure correct path separators for S3
      await uploadFile(fullPath, s3Bucket, s3Key);
    }
  }));
};

// Function: List objects in S3 bucket
const listS3Objects = async (s3Bucket) => {
  const listParams = {
    Bucket: s3Bucket
  };
  try {
    const data = await s3.send(new ListObjectsV2Command(listParams));
    return data.Contents || [];
  } catch (err) {
    console.error('Error listing S3 objects:', err);
    return [];
  }
};

// Function: Delete object in S3 bucket
const deleteS3Object = async (s3Bucket, s3Key) => {
  const deleteParams = {
    Bucket: s3Bucket,
    Key: s3Key
  };
  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log(`Deleted ${s3Key} from S3`);
  } catch (err) {
    console.error(`Error deleting ${s3Key}:`, err);
  }
};

// Function: Clear S3 bucket
const clearS3Bucket = async (s3Bucket, buildFiles) => {
  const currentS3Files = await listS3Objects(s3Bucket);
  const buildFilesSet = new Set(buildFiles.map(file => file.replace(/\\/g, '/')));

  await Promise.all(currentS3Files.map(async (file) => {
    if (!buildFilesSet.has(file.Key)) {
      await deleteS3Object(s3Bucket, file.Key);
    }
  }));
};

// Function: Get list of all files in the build directory
const getBuildFiles = (srcDir) => {
  const files = [];
  const readDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        readDirectory(fullPath);
      } else {
        files.push(fullPath.replace(`${buildDirectory}${path.sep}`, ''));
      }
    });
  };
  readDirectory(srcDir);
  return files;
};

// Start upload process
(async () => {
  try {
    const buildFiles = getBuildFiles(buildDirectory);
    await clearS3Bucket(bucketName, buildFiles);
    await uploadDirectory(buildDirectory, bucketName);
    console.log('Upload complete!');
  } catch (err) {
    console.error('Error during upload process:', err);
  }
})();
