import AdSpace from "@/components/AdSpace";
import Categories from "@/components/Categories";
import Sidebar from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <div className="flex flex-1 flex-col md:flex-row gap-4">
        <div className="flex-1 ">
          <Categories />
          {/* <h1 className="mb-4 text-xl font-bold md:text-2xl">Recommended</h1> */}
          <Suspense fallback={<div>Loading...</div>}>
            <div className="p-4 md:p-6">
              <VideoGrid />
            </div>
          </Suspense>
        </div>
        <div className="p-4 ps-0">
          <AdSpace />
        </div>
      </div>
    </main>
  );
}
