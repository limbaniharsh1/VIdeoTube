"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/hooks/commonHooks";
import AdSpace from "@/components/AdSpace";

export default function VideoPlayer(data) {
  const thumbnail =
    "https://res.cloudinary.com/ddlxqynmb/image/upload/v1747933897/my_videos/my_videos/zqea3hxm4iwf5es6v26x/thumbnail.jpg";
  const video =
    "https://res.cloudinary.com/ddlxqynmb/video/upload/v1747933892/my_videos/zqea3hxm4iwf5es6v26x.mp4";
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const videoRef = useRef(null);

  // When video is ready to play
  const handleCanPlay = () => {
    console.log("Video can play");
    setIsLoading(false);
    // Attempt to play automatically
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Auto-play was prevented:", err);
        setIsLoading(false);
      });
    }
  };

  // When video starts playing (either auto or user click)
  const handlePlay = () => {
    console.log("Video started playing");
    setIsLoading(false);
    setHasStartedPlaying(true);
  };

  const handleVideoError = (e) => {
    console.error("Video error:", e);
    setIsLoading(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    
    // Check if video is already playing when component mounts
    if (videoElement) {
      if (videoElement.readyState > 0 && !videoElement.paused) {
        setIsLoading(false);
        setHasStartedPlaying(true);
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.pause();
        // videoElement.removeEventListener('canplay', handleCanPlay);
        // videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('error', handleVideoError);
      }
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] gap-8 xl:gap-10 w-full py-10 lg:items-center justify-center px-6 bg-black">
      <div className="relative w-full lg:w-[70%] overflow-hidden rounded-xl">
        <div className="aspect-video w-full relative">
          {/* Loader + Thumbnail - Only show if video hasn't started playing */}
          {!hasStartedPlaying && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <Image
                src={thumbnail || "/placeholder.svg"}
                alt={data?.title}
                fill
                className="object-cover"
                priority
              />
              {/* {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
              )} */}
            </div>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            // muted={false}
            // autoPlay
            className="h-full w-full"
            poster={hasStartedPlaying ? undefined : thumbnail}
            controls
            preload="auto"
            onCanPlay={handleCanPlay}
            onPlay={handlePlay}
            onError={handleVideoError}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="hidden lg:block">
        <AdSpace />
      </div>
    </div>
  );
}