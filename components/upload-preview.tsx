"use client";
import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { uploadImage } from "@/app/actions/cloudinary";
import { BeatLoader } from "react-spinners";
import { Dispatch, SetStateAction } from "react";
import { UploadApiResponse } from "cloudinary";
import { toast, Bounce } from "react-toastify";
import { useDropzone } from "react-dropzone";

interface ISetResponse {
  setResponse: Dispatch<SetStateAction<UploadApiResponse | undefined>>;
}

export default function UploadPreview({ setResponse }: ISetResponse) {
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setFileData(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Allow only one file at a time
    accept: { "image/*": [] }, // Accept only image files
  });

  const handleSubmit = async () => {
    if (!fileData) return;
    setIsLoading(true);
    try {
      const res = await uploadImage(fileData, fileName);
      if (res) {
        if ("public_id" in res) {
          setFileData(null);
          setResponse(res);
          setIsLoading(false);
          notify(true);
        } else {
          setIsLoading(false);
          notify(false);
        }
      }
    } catch (error) {
      console.error(error);
      notify(false);
    } finally {
      setIsLoading(false);
    }
  };

  const notify = (success: boolean) => {
    if (success) {
      toast.success("Upload Completed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.error("Upload Failed! Check in Console", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center h-70 cursor-pointer border-gray-300 hover:border-blue-500 bg-blue-300/20`}
      >
        <input {...getInputProps()} />
        {fileData ? (
          <div className="relative w-full flex flex-col items-center">
            <Image
              src={fileData}
              alt="Preview"
              className="max-h-60 w-60 rounded-lg object-cover shadow-md"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <div className="text-center">
            <Camera className="mx-auto" color="#ffffffff" size={"60px"} />
            <p className="text-white font-bold">
              Drag & drop an image here, or click to select one
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center my-3">
        <button
          type="submit"
          className={`text-white hover:bg-blue-500/90 transition duration-300 ease-in-out px-3 py-1 rounded-full mx-1 ${
            isLoading
              ? `cursor-wait bg-blue-500/90`
              : `cursor-pointer bg-blue-600/90`
          }`}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? <BeatLoader color="white" size={7} /> : "Upload"}
        </button>
        <button
          onClick={() => setFileData(null)}
          className="text-white bg-red-500/90 hover:bg-red-400/90 transition duration-300 ease-in-out cursor-pointer px-3 py-1 rounded-full mx-1"
        >
          Remove
        </button>
      </div>
    </>
  );
}
