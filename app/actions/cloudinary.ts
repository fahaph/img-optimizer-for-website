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
      folder: "assets",
      public_id: fileName.split(".")[0],
      unique_filename: false,
      overwrite: true,
      resource_type: "auto",
      transformation: [
        { quality: "auto" }
      ]
    });
    return res;
  } catch (error) {
    return { error: error, message: "Upload Failed." };
  }
}
