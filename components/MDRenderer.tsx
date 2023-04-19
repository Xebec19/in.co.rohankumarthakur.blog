import React, { useEffect, useState } from "react";
import styles from "../styles/MDRenderer.module.css";
import ReactMarkdown from "react-markdown";
import SkeletonCard from "./BlogSkeleton";
import BlogSkeleton from "./BlogSkeleton";

const MDRenderer: React.FC<{ source: string }> = ({ source }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");

  const fetchPost = async () => {
    try {
      let response = await fetch(source);
      let postBody = await response.text();
      setPost(postBody);
    } catch (error) {
      // todo notification
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  });

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return <ReactMarkdown className={styles.container}>{post}</ReactMarkdown>;
};

export default React.memo(MDRenderer);
