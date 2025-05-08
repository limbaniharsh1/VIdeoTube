"use client"

import { useMediaQuery } from "@/hooks/commonHooks"



export default function AdSpace() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return (
      <div className="mx-4 my-4 flex h-20 items-center justify-center rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        Advertisement
      </div>
    )
  }

  return (
    <div className="sticky top-16 hidden w-[300px] flex-shrink-0 md:block lg:w-[300px]">
      <div className="m-4 flex h-[600px] flex-col items-center justify-center rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <p>Advertisement</p>
        <p className="mt-2 text-xs">300x600</p>
      </div>
    </div>
  )
}

