import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // สำหรับ App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // สำหรับ Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // สำหรับโฟลเดอร์ components
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // สำคัญมากถ้าคุณใช้ src/ folder
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
