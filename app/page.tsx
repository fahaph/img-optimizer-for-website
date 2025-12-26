import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex">
          <Image
            className="invert "
            src="/next.svg"
            alt="Next.js logo"
            width={150}
            height={50}
            priority
          />
          <Image
            src={
              "https://res.cloudinary.com/dnvnjiopg/image/upload/v1766220077/samples/cloudinary-logo-vector.svg"
            }
            className=""
            alt="Cloudinary logo"
            width={200}
            height={100}
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-zinc-300">
            Turning idle hours into functional art. Because doing nothing was
            not an option. Crafted by <a href="https://github.com/fahaph" target="_blank"><span className="font-extrabold text-white">fahaph</span></a>{" "}
            for the portfolio.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Powered by.{" "}
            <a
              href="https://nextjs.org/"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://cloudinary.com/"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Cloudinary
            </a>{" "}
            to deliver high-performance, fully optimized images for the modern
            web.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="bg-white/20 rounded-full p-3 backdrop-blur-sm border-1 border-zinc-400 text-white hover:bg-white/30 transition-all ease-in-out duration-200"
            href="/uploads"
            rel="noopener noreferrer"
          >
            Upload Image
          </a>
        </div>
      </main>
    </div>
  );
}
