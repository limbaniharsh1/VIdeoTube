"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/hooks/commonHooks";
import {
  formatDuration,
  formatTimeAgo,
  formatViewsCount,
} from "@/helpers/commonFunctions";

export default function VideoCard({
  _id = "",
  thumbnail = "",
  url = "",
  title = "Video Title",
  description = "Video Description",
  channel = "Channel Name",
  views = "1M views",
  createdAt = "",
  duration = "1:00",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [showHoverPreview, setShowHoverPreview] = useState(false);

  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimer.current = setTimeout(() => {
      setShowPreview(true);
      const vid = videoRef.current;
      if (vid) vid.play();
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    setProgress(0);
    setShowPreview(false);
    setShowHoverPreview(false);
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (vid && vid.duration) {
      setProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  const handleSeek = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Prevent Link wrapping

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    const vid = videoRef.current;
    if (vid && vid.duration) {
      vid.currentTime = percent * vid.duration;
    }
  };

  const handleTimelineHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    setPreviewPosition(hoverX);
    setShowHoverPreview(true);

    const previewVideo = previewRef.current;
    const vid = videoRef.current;
    if (previewVideo && vid && vid.duration) {
      const percent = hoverX / rect.width;
      previewVideo.currentTime = percent * vid.duration;
    }
  };

  const hideHoverPreview = () => {
    setShowHoverPreview(false);
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mb-2 overflow-hidden rounded-xl">
        <Link href={`/${_id}`} prefetch={false}>
          <div className="aspect-video w-full overflow-hidden relative">
            {showPreview && url ? (
              <>
                <video
                  ref={videoRef}
                  src={url}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                />

                {/* Custom Timeline */}
                <div
                  className="absolute bottom-0 left-0 w-full h-3.5 cursor-pointer"
                  onClick={handleSeek}
                  onMouseMove={handleTimelineHover}
                  onMouseLeave={hideHoverPreview}
                >
                  <div className="h-full w-full flex items-end justify-center">
                    <div className="bg-black/40 h-1.5 w-full">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Hover Preview Frame */}
                  {showHoverPreview && (
                    <div
                      className="absolute bottom-6 pointer-events-none z-20"
                      style={{
                        left: previewPosition - 50,
                        width: 100,
                      }}
                    >
                      <video
                        ref={previewRef}
                        src={url}
                        muted
                        playsInline
                        width={100}
                        height={56}
                        className="rounded border border-gray-700"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : thumbnail ? (
              <Image
                src={thumbnail}
                alt={title}
                width={320}
                height={180}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-200",
                  isHovered && "scale-110"
                )}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">No Thumbnail</span>
              </div>
            )}
          </div>
          {!showPreview && (
            <div className="absolute bottom-1 right-1 rounded bg-black bg-opacity-80 px-1 py-0.5 text-xs text-white">
              {formatDuration(duration)}
            </div>
          )}
        </Link>
      </div>

      <div className="flex">
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatViewsCount(views)} Views • {formatTimeAgo(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
