import { List } from "@mui/material";
import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonList: React.FC<{ limit: number }> = ({ limit }) => {
  const dummyPosts = (limit: number) => {
    let posts = [];
    for (let i = 0; i < limit; i++) {
      posts.push(<SkeletonCard />);
    }

    return posts;
  };
  return <List>{dummyPosts(limit)}</List>;
};

export default React.memo(SkeletonList);
