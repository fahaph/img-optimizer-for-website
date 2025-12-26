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
      chunk_size: 5000000, // กำหนดให้ส่งชุดละ 5 mb
      folder: "assets",
      public_id: fileName.split(".")[0],
      unique_filename: false,
      overwrite: true,
      resource_type: "auto",
      format: "webp",
      invalidate: true,
      transformation: [
        { with:2000, height: 2000, crop: "limit" },
        { quality: "auto" }
      ]
    });
    return res;
  } catch (error) {
    console.log(error);
    return { error: error, message: "Upload Failed." };
  }
}
