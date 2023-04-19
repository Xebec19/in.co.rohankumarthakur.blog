import React, { useEffect } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";
import { format } from "date-fns";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "../styles/Post.module.css";
import ShareIcon from "@mui/icons-material/Share";
import { IPostItem } from "@/interfaces";
import SkeletonCard from "@/components/SkeletonCard";
import MDRenderer from "@/components/MDRenderer";
import BlogSkeleton from "@/components/BlogSkeleton";
import useSharer from "@/hooks/useSharer";

const SHARER_TEXT =
  "Excited to share this insightful article on web development!";
const SHARER_TITLE =
  "Discover the Latest in Web Development with This Informative Article";
const DEFAULT_DESCRIPTION = `Welcome to my personal blogging website! 
As a web developer with 2 years of experience,
I love sharing my knowledge and passion for all things tech-related. Here you'll find a variety
of blog posts on web development, software hacks, and other DIY projects. Whether you're a 
seasoned pro or just starting out, my blog is the perfect place to learn and grow your skills. 
Stay up-to-date with the latest trends and techniques in the tech world and join the 
conversation by leaving your thoughts and comments.`;

const PostPage: React.FC<{ post: IPostItem }> = ({ post }) => {
  let { twitterSharer, customSharer } = useSharer();

  if (!post) {
    return (
      <main>
        <Navigation />
        <Box className={styles.main}>
          <Card className={styles.card}>
            <CardHeader title="No Post Found" className={styles.title} />
            <CardMedia className={styles.media}>
              <Image
                src="/undraw_No_data_re_kwbl.png"
                alt="No post found"
                width={325}
                height={325}
                priority={true}
              />
            </CardMedia>
          </Card>
        </Box>
        <Footer />
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>{post.title ? post.title : "Rohan Kumar Thakur"}</title>
        <meta
          name="description"
          content={
            post?.description ? post.description.String : DEFAULT_DESCRIPTION
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Rohan Kumar Thakur" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.image_url.String} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.description.String} />
      </Head>
      <main>
        <Navigation />
        {post ? (
          <Box className={styles.main}>
            <Typography variant="h3" component="div" gutterBottom>
              {post.title}
            </Typography>
            <Box>
              {post?.tags?.map((tag, index) => (
                <Chip key={index} sx={{ m: 1 }} label={tag} />
              ))}
            </Box>
            <Box>
              <Typography variant="body1" color="textSecondary">
                {format(new Date(post.created_at.Time), "MMM dd yyyy")}
              </Typography>
            </Box>
            <Box className={styles.content}>
              {post?.source?.String ? (
                <MDRenderer source={post?.source?.String} />
              ) : (
                <BlogSkeleton />
              )}
            </Box>
            <Box>
              <IconButton
                className="twitter-share-button"
                onClick={() =>
                  twitterSharer(SHARER_TEXT, window.location.href, [
                    "webdevelopment",
                    "coding",
                  ])
                }
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                className="custom-share-button"
                onClick={() =>
                  customSharer(SHARER_TITLE, SHARER_TEXT, window.location.href)
                }
              >
                <ShareIcon />
              </IconButton>
            </Box>
            <Box>{/* <Comments commentList={post.comments} /> */}</Box>
          </Box>
        ) : (
          <Box className={styles.main}>
            <SkeletonCard />
          </Box>
        )}
        <Footer />
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    let { post: postId } = context.params;

    let url = process.env.BASE_URL + "posts/" + postId;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (!response.status) {
      throw new Error("Post not found!");
    }

    let post: IPostItem = response?.payload;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        post: null,
      },
    };
  }
}

export default PostPage;
