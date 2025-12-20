"use client";
import UploadPreview from "./upload-preview";
import { Suspense, useState } from "react";
import { UploadApiResponse } from "cloudinary";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function UploadsCard() {
  const [response, setResponse] = useState<UploadApiResponse | undefined>(
    undefined
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <div className="bg-white/20 rounded-2xl p-10 w-[90%] h-fit md:w-[50%] md:h-fit backdrop-blur-sm border-1 border-zinc-400 text-white">
      <h1 className="text-xl font-bold w-fit mx-auto md:mx-0 mb-3">
        <span className="text-blue-500">UPLOAD</span> IMAGE
      </h1>
      <div className="w-full">
        <UploadPreview setResponse={setResponse} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`flex items-center border-2 border-gray-300 border-dashed rounded-xl p-5 ${
              response ? "grid grid-cols-1 md:grid-cols-2 gap-2" : ""
            }`}
          >
            {response ? (
              <Suspense>
                <Image
                  src={response.secure_url}
                  alt=""
                  width={50}
                  height={50}
                  className="h-30 w-30 rounded mx-auto"
                  loading="lazy"
                />
                <div className="text-center">
                  <input
                    readOnly
                    value={response.secure_url}
                    className="rounded-full px-2 py-2 border-1 border-zinc-400 w-full mb-3"
                  />
                  <CopyToClipboard
                    text={response.secure_url}
                    onCopy={handleCopy}
                  >
                    <button className="relative bg-green-500/90 hover:bg-green-400/90 px-3 py-1 rounded-full transition-all duration-300 ease-in-out cursor-pointer w-20 overflow-hidden">
                      <span
                        className={`block transition-all duration-300 ${
                          isCopied
                            ? "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        Copy
                      </span>
                      <span
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          isCopied
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
                        }`}
                      >
                        Copied!
                      </span>
                    </button>
                  </CopyToClipboard>
                </div>
              </Suspense>
            ) : (
              <div className="mx-auto">Your Image will be here</div>
            )}
          </div>
          <div className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-xl p-5">
            <div>Coming Soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
