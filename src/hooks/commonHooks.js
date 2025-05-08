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
