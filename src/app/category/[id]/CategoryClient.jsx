"use client";
import VideoCard from "@/components/VIdeoCard";
import { QUERY_TITLES } from "@/helpers/enum";
import { getAllVideoThunk } from "@/store/videos/thunk";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryClient = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.Videos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getAllVideoThunk({ [QUERY_TITLES.CATEGORY]: id }));
    }
  }, [id]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((video, index) => (
        <VideoCard key={index} {...video} />
      ))}
    </div>
  );
};

export default CategoryClient;
