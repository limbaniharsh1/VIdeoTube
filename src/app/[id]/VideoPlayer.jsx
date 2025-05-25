"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/hooks/commonHooks";
import AdSpace from "@/components/AdSpace";

export default function VideoPlayer({ data, loading }) {
  const thumbnail = data?.thumbnail || "";
  const videoUrl = data?.url || "";
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    console.log("Video URL:", videoUrl); // Debugging
    console.log("Video element readyState:", videoElement.readyState); // Debugging

    const handlers = {
      canplay: () => {
        console.log("Can play event fired");
        setIsLoading(false);
        if (!hasStartedPlaying) {
          videoElement.play().catch((err) => {
            console.log("Autoplay failed, waiting for user interaction:", err);
            setError("Click to play video");
          });
        }
      },
      playing: () => {
        console.log("Playing event fired");
        setIsLoading(false);
        setHasStartedPlaying(true);
        setError(null);
      },
      error: (e) => {
        console.error("Video error:", e);
        setError("Failed to load video");
        setIsLoading(false);
      },
      waiting: () => {
        console.log("Waiting event fired");
        setIsLoading(true);
      },
    };

    // Add event listeners
    Object.entries(handlers).forEach(([event, handler]) => {
      videoElement.addEventListener(event, handler);
    });

    // Try to load if URL changes
    if (videoUrl) {
      videoElement.load();
    }

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        videoElement.removeEventListener(event, handler);
      });
    };
  }, [videoUrl, hasStartedPlaying]);

  return (
    <div className="flex h-[calc(100vh-64px)] gap-8 xl:gap-10 w-full py-10 lg:items-center justify-center px-6 bg-black">
      <div className="relative w-full lg:w-[70%] overflow-hidden rounded-xl">
        <div className="aspect-video w-full relative">
          {/* Error message */}
          {/* {!hasStartedPlaying && error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
              <button
                onClick={() => {
                  videoRef.current?.play(), setError(null);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {error}
              </button>
            </div>
          )} */}

          {/* Loader + Thumbnail */}
          {/* {loading ||
            (!hasStartedPlaying && !error && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <Image
                  src={loading ? "" : thumbnail || "/placeholder.svg"}
                  alt={data?.title || "Video thumbnail"}
                  fill
                  className="object-cover"
                  priority
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="h-12 w-12 animate-spin text-white" />
                  </div>
                )}
              </div>
            ))} */}

          {/* Video Element */}
          {!loading && (
            <video
              ref={videoRef}
              //   muted
              autoPlay
              playsInline
              className="h-full w-full"
              poster={!hasStartedPlaying ? thumbnail : undefined}
              controls
              preload="auto"
              controlsList="nodownload"
              key={videoUrl} // Force re-render when URL changes
            >
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="hidden lg:block">
        <AdSpace />
      </div>
    </div>
  );
}
