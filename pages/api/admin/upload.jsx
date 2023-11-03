import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    signatureVersion: "v4",
  });
  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    ACL: "public-read",
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Fields: { key: `iracing/${req.query.file}` },
    Expires: 60,
    CacheControl: "no-cache",
  });
  res.status(200).json(url);
}
