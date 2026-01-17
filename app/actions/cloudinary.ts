"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileData: string | null, fileName: string | null) {
  if (fileData === null || fileName === null) return { error: "error", message: "Can't find file." };
  try {
    const res = await cloudinary.uploader.upload(fileData, {
      chunk_size: 2500000, // กำหนดให้ส่งชุดละ 2.5 mb
      folder: "assets",
      unique_filename: true,
      resource_type: "auto",
      transformation: [
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });
    return res;
  } catch (error) {
    console.log(`Cloudinary Upload Error: ${error}`);
    return { error: error, message: "Upload Failed." };
  }
}
