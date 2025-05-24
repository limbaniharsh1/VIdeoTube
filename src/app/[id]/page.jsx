"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { getVideoThunk } from "@/store/videos/thunk";

export default function VideoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleVideo, loading } = useSelector((state) => state.Videos);

  useEffect(() => {
    if (id) {
      dispatch(getVideoThunk(id));
    }
  }, [id, dispatch]);
  // if (loading) return <div className="text-white p-4">Loading...</div>;
  // if (error)
  //   return <div className="text-red-500 p-4">Error: {error.message}</div>;
  // if (!singleVideo?.video) return null;

  return <VideoPlayer data={singleVideo} loading={loading} />;
}
