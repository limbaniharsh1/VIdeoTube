import AdSpace from "@/components/AdSpace";
import Sidebar from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#f9f9f9] dark:bg-[#0f0f0f]">
      <Sidebar />
      <div className="flex flex-1 flex-col md:flex-row p-4 md:p-6 gap-4">
        <div className="flex-1 ">
          {/* <h1 className="mb-4 text-xl font-bold md:text-2xl">Recommended</h1> */}
          <Suspense fallback={<div>Loading...</div>}>
            <VideoGrid />
          </Suspense>
        </div>
        <AdSpace />
      </div>
    </main>
  );
}
