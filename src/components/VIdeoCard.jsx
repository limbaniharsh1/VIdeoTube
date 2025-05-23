"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { cn } from "@/hooks/commonHooks";
import {
  formatDuration,
  formatTimeAgo,
  formatViewsCount,
} from "@/helpers/commonFunctions";

export default function VideoCard({
  _id = "",
  thumbnail = "",
  title = "Video Title",
  description = "Video Description",
  channel = "Channel Name",
  channelImage = "",
  views = "1M views",
  createdAt = "",
  duration = "1:00",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-2 overflow-hidden rounded-xl">
        <Link href={`/${_id}`}>
          <div className="aspect-video w-full overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail || "/placeholder.svg"}
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
          <div className="absolute bottom-1 right-1 rounded bg-black bg-opacity-80 px-1 py-0.5 text-xs text-white">
            {formatDuration(duration)}
          </div>
        </Link>
      </div>
      <div className="flex">
        {/* <div className="mr-3 mt-0.5 h-9 w-9 flex-shrink-0">
          <Image
            src={channelImage || "/placeholder.svg"}
            alt={channel}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div> */}
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatViewsCount(views)} Views • {formatTimeAgo(createdAt)}
          </p>
        </div>
        <div className="ml-1 self-start">
          <button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
