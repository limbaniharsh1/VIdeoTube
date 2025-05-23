"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export function cn(...inputs) {
  return twMerge(clsx(...inputs)); // or just clsx(...inputs) if not using tailwind-merge
}

// utils/useQueryParams.js
import { useSearchParams } from "next/navigation";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const title = searchParams.get("title");
  const value = searchParams.get("value");

  if (title && value) {
    return {
      [title]: value, // dynamic key like { category: '123' } or { search: 'abc' }
      page,
    };
  }

  return { page };
}
