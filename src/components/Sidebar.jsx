"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { cn, useMediaQuery, useQueryParams } from "@/hooks/commonHooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryThunk } from "@/store/category/thunk";
import { useRouter } from "next/navigation";
import { QUERY_TITLES } from "@/helpers/enum";
import { commonQuery } from "@/helpers/commonFunctions";
import AdSpace from "./AdSpace";

export default function Sidebar() {

  // const handleCategoryClick = (category) => {
  //   router.push(`/?category=${encodeURIComponent(category)}&page=1`);
  // };

  //   const subscriptionLinks = [
  //     { label: "Music", icon: Music },
  //     { label: "Sports", icon: Trophy },
  //     { label: "Gaming", icon: Gamepad2 },
  //     { label: "News", icon: Newspaper },
  //     { label: "Learning", icon: Lightbulb },
  //     { label: "Fashion", icon: Shirt },
  //     { label: "Trending", icon: Flame },
  //   ]


  // if (isMobile) {
  //   return (
  //     <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t py-2 border-gray-800 bg-[#0f0f0f]">
  //       {mainLinks.map((link, index) => (
  //         <Link
  //           key={index}
  //           href="#"
  //           className="flex flex-col items-center px-2 py-1 text-xs"
  //         >
  //           <link.icon className="mb-1 h-5 w-5" />
  //           <span>{link.label}</span>
  //         </Link>
  //       ))}
  //     </div>
  //   );
  // }

  return <div className="p-4 pe-0"> <AdSpace /></div>
}
