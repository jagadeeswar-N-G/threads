import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
     <div className="grid grid-cols-12 w-full h-screen">
      <div className="col-span-3"></div>
      <div className="col-span-6 border-x-2 border-x-[0.2xp] border-x-white"></div>
      <div className="col-span-3"></div>

     </div>

     
    </div>
  );
}
