"use server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileData: string | null, fileName: string | null) {
  if (fileData === null || fileName === null) {
    return { error: "error", message: "Can't find file." };
  }

  try {
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "assets",
            unique_filename: true,
            resource_type: "auto",
            format: "webp",
            invalidate: true,
            transformation: [
              { quality: "auto" },
              { fetch_format: "webp" },
            ],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        const bufferStream = new Readable();
        const base64Data = fileData.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        bufferStream.push(buffer);
        bufferStream.push(null);
        bufferStream.pipe(stream);
      });
    };

    const res = await uploadStream();
    return res;
  } catch (error) {
    console.log(`Cloudinary Upload Error: ${error}`);
    return { error: error, message: "Upload Failed." };
  }
}
