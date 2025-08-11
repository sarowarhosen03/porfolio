"use server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import path from "path";
const BUCKET_NAME = "portfolio";

export async function uploadFile(
  R2: S3Client,
  fileName: string,
  buffer: Buffer
) {
  // Create a unique key for the file
  const extname = path.extname(fileName);
  const basename = path.basename(fileName, extname);
  const key = `${basename}-${new Date()
    .toISOString()
    .replace(/:/g, "-")}${extname}`
    .trim()
    .replaceAll(" ", "-");

  const putObjectCommandClient = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    // ContentType: "application/octet-stream",
  });

  try {
    // Upload the file to Cloudflare R2
    const data = await R2.send(putObjectCommandClient);

    // Construct the file's URL
    const fileUrl = `${process.env.CLOUDFLARE_CONTENT}/${BUCKET_NAME}/${key}`;

    return { error: false, url: fileUrl };
  } catch (error: any) {
    return { error: true, message: error?.message || "" };
  }
}

export async function uploadFiles(files: File[]) {
  const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_CLIENT_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID!,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });

  const uploadedFiles: string[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadFile(R2, file.name, buffer);

    if (uploadResult.error) {
      await deleteFile(uploadedFiles);
      return { success: false, message: uploadResult.message, status: 500 };
    }

    if (uploadResult?.url) {
      uploadedFiles.push(uploadResult.url);
    }
  }
  R2.destroy();
  return { success: true, urls: uploadedFiles, status: 201 };
}

export async function deleteFile(urls: string[]) {
  const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_CLIENT_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID!,
    },
  });
  const keys = urls.map((url) => {
    return R2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: url.replace(`${process.env.CLOUDFLARE_CONTENT!}/portfolio/`, ""),
      })
    );
  });

  try {
    await Promise.all(keys);

    R2.destroy();
    return { error: false, message: "all files deleted successfully" };
  } catch (error: any) {
    R2.destroy();
    return { error: true, message: error?.message || "" };
  }
}
