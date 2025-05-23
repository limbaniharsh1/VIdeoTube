"use client";

import { useEffect, useMemo } from "react";
import VideoCard from "./VIdeoCard";
import { getAllVideoThunk } from "@/store/videos/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "@/hooks/commonHooks";

export default function VideoGrid() {
  // Sample video data

  const { data } = useSelector((state) => state.Videos);
  const dispatch = useDispatch();
  const rawQuery = useQueryParams();
   const query = useMemo(() => rawQuery, [rawQuery.category, rawQuery.search, rawQuery.page]);

  useEffect(() => {
    dispatch(getAllVideoThunk(query));
  }, [query]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((video, index) => (
        <VideoCard key={index} {...video} />
      ))}
    </div>
  );
}
