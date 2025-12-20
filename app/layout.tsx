import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome | fahaph's img optimizer",
  description:
    "ยินดีต้อนรับ | เครื่องมือรูปภาพสำหรับการปรับปรุงคุณภาพเว็บไซต์ โดย github.com/fahaph ขอขอบคุณเพื่อนร่วมฝึกงานที่ onesiam co.,ltd และ เป็นพิเศษสำหรับที่แบงค์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative h-screen w-full bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[15%] left-[20%] w-[600px] h-[600px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
             <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
