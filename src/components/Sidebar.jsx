"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  Film,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Flame,
  ChevronDown,
} from "lucide-react"
import { cn, useMediaQuery } from "@/hooks/commonHooks"

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const [expanded, setExpanded] = useState(!isTablet)

  const mainLinks = [
    { icon: Home, label: "Home" },
    { icon: Compass, label: "Explore" },
    { icon: PlaySquare, label: "Shorts" },
    { icon: Film, label: "Subscriptions" },
  ]

  const personalLinks = [
    { icon: Clock, label: "Library" },
    { icon: History, label: "History" },
    { icon: PlaySquare, label: "Your videos" },
    { icon: ThumbsUp, label: "Liked videos" },
  ]

//   const subscriptionLinks = [
//     { label: "Music", icon: Music },
//     { label: "Sports", icon: Trophy },
//     { label: "Gaming", icon: Gamepad2 },
//     { label: "News", icon: Newspaper },
//     { label: "Learning", icon: Lightbulb },
//     { label: "Fashion", icon: Shirt },
//     { label: "Trending", icon: Flame },
//   ]

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t bg-white py-2 dark:border-gray-800 dark:bg-[#0f0f0f]">
        {mainLinks.map((link, index) => (
          <Link key={index} href="#" className="flex flex-col items-center px-2 py-1 text-xs">
            <link.icon className="mb-1 h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r bg-white transition-all dark:border-gray-800 dark:bg-[#0f0f0f]",
        expanded ? "w-56" : "w-[72px]",
      )}
    >
      <div className="py-2">
        {mainLinks.map((link, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              "flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
              expanded ? "mx-2 rounded-lg" : "justify-center",
            )}
          >
            <link.icon className="h-5 w-5" />
            {expanded && <span className="ml-4">{link.label}</span>}
          </Link>
        ))}
      </div>

      {expanded && (
        <>
          <div className="border-t py-2 dark:border-gray-800">
            <h3 className="px-5 py-2 text-sm font-semibold">You</h3>
            {personalLinks.map((link, index) => (
              <Link
                key={index}
                href="#"
                className="mx-2 flex items-center rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <link.icon className="h-5 w-5" />
                <span className="ml-4">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* <div className="border-t py-2 dark:border-gray-800">
            <h3 className="px-5 py-2 text-sm font-semibold">Subscriptions</h3>
            {subscriptionLinks.map((link, index) => (
              <Link
                key={index}
                href="#"
                className="mx-2 flex items-center rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <link.icon className="h-5 w-5" />
                <span className="ml-4">{link.label}</span>
              </Link>
            ))}
            <button
              variant="ghost"
              className="mx-2 flex w-[calc(100%-16px)] items-center justify-start rounded-lg px-3 py-2"
            >
              <ChevronDown className="h-5 w-5" />
              <span className="ml-4">Show more</span>
            </button>
          </div> */}
        </>
      )}

      {!expanded && (
        <div className="py-2">
          {personalLinks.slice(0, 2).map((link, index) => (
            <Link
              key={index}
              href="#"
              className="flex justify-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      )}
    </aside>
  )
}
