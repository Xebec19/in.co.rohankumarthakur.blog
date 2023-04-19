import React, { useEffect, useState } from "react";
import styles from "../styles/MDRenderer.module.css";
import ReactMarkdown from "react-markdown";
import SkeletonCard from "./BlogSkeleton";
import BlogSkeleton from "./BlogSkeleton";

const MDRenderer: React.FC<{ source: string }> = ({ source }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      let response = await fetch(source);
      response = await response.text();
      console.log(response);
      setPost(response);
    } catch (error) {
      // todo notification
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return <ReactMarkdown className={styles.container}>{post}</ReactMarkdown>;
};

export default React.memo(MDRenderer);
