"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useMediaQuery } from "@/hooks/commonHooks";
import { useSelector } from "react-redux";
import Link from "next/link";
import { QUERY_TITLES } from "@/helpers/enum";

export default function Categories({
  /**  ⓘ selectedCategory now holds the *slug* of the active category. */
  selectedCategory = "",
  onCategoryChange,
}) {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [hiddenCategories, setHiddenCategories] = useState([]);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data } = useSelector((state) => state.Category);

  /* ❗ Build objects {name, slug} so we can show the name but route with the slug */
  const categories = useMemo(() => {
    const list =
      data?.length > 0 ? data.map((c) => ({ name: c.name, slug: c.slug })) : [];
    return [{ name: "All", slug: "" }, ...list];
  }, [data]);

  /* -------------- LAYOUT CALCULATIONS -------------- */
  useEffect(() => {
    if (isMobile) return;

    const updateVisibleCategories = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.offsetWidth - 120;
      let totalWidth = 0;
      const visible = [];
      const hidden = [];

      categories.forEach((c) => {
        const estimatedWidth = c.name.length * 8 + 32 + 8;
        if (
          totalWidth + estimatedWidth <= containerWidth &&
          visible.length < 10
        ) {
          visible.push(c);
          totalWidth += estimatedWidth;
        } else {
          hidden.push(c);
        }
      });

      setVisibleCategories(visible);
      setHiddenCategories(hidden);
    };

    updateVisibleCategories();
    window.addEventListener("resize", updateVisibleCategories);
    return () => window.removeEventListener("resize", updateVisibleCategories);
  }, [isMobile, categories]);

  /* -------------- SCROLL HANDLERS (MOBILE) -------------- */
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    };

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [isMobile]);

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  /* ❗ Pass the slug back up so the backend can filter on it */
  const handleCategoryClick = (c) => onCategoryChange?.(c.slug);

  /* ---------------- MOBILE RENDER ---------------- */
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t py-1 border-gray-800 bg-[#0f0f0f]">
        {showScrollButtons && canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 h-8 w-8 rounded-full bg-white shadow-md dark:bg-gray-800"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide"
        >
          {categories.slice(0, 7).map((c) => (
            <Link
              href={c.slug ? `/${QUERY_TITLES.CATEGORY}/${c.slug}` : "/"}
              key={c.slug || "all"}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium",
                (
                  c.slug
                    ? window.location.pathname?.includes(c.slug)
                    : window.location.pathname === "/"
                )
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
              onClick={() => handleCategoryClick(c)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {showScrollButtons && canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 h-8 w-8 rounded-full bg-white shadow-md dark:bg-gray-800"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* dropdown with slugs */}
        {categories.length > 0 && (
          <div className="px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  All
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="max-h-60 w-48 overflow-y-auto bg-black"
              >
                {categories.map((c) => (
                  <DropdownMenuItem
                    key={c.slug || "all"}
                    onClick={() => handleCategoryClick(c)}
                  >
                    {c.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- DESKTOP RENDER ---------------- */
  return (
    <div className="sticky top-16 z-40 border-b bg-white px-6 py-3 dark:border-gray-800 dark:bg-[#0f0f0f]">
      <div ref={containerRef} className="flex items-center gap-2">
        {visibleCategories.map((c) => (
          <Link
            href={c.slug ? `/${QUERY_TITLES.CATEGORY}/${c.slug}` : "/"}
            key={c.slug || "all"}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
              /* ❗ active by slug */
              (
                c.slug
                  ? window.location.pathname?.includes(c.slug)
                  : window.location.pathname === "/"
              )
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
            onClick={() => handleCategoryClick(c)}
          >
            {c.name}
          </Link>
        ))}

        {hiddenCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                More
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-60 w-48 overflow-y-auto"
            >
              {hiddenCategories.map((c) => (
                <DropdownMenuItem
                  key={c.slug}
                  onClick={() => handleCategoryClick(c)}
                  className={cn(
                    selectedCategory === c.slug &&
                      "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  {c.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
