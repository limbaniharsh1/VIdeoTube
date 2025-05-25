"use client";

import VideoCard from "@/components/VIdeoCard";
import { getAllVideoThunk } from "@/store/videos/thunk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchClient() {
  const { data, loading } = useSelector((store) => store.Videos);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) return;
    dispatch(getAllVideoThunk({ search: query }));
  }, [query]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-blue-600">"{query}"</span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
