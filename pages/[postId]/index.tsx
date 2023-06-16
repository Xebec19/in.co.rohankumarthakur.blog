import React, { Suspense, useEffect } from "react";
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
import styles from "../../styles/Post.module.css";
import ShareIcon from "@mui/icons-material/Share";
import { IPostItem } from "@/interfaces";
import SkeletonCard from "@/components/SkeletonCard";
import MDRenderer from "@/components/MDRenderer";
import BlogSkeleton from "@/components/BlogSkeleton";
import useSharer from "@/hooks/useSharer";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { environments } from "@/utils/environments";
import { sharerPayload } from "@/config/share-text";
import AdsContainer from "@/components/AdsContainer";
import { STATIC_SLUG_LENGTH } from "@/config/default-values";
import { ISlugEntity } from "@/interfaces/post";
import CommentSection from "@/components/CommentSection";

const SHARER_TEXT = sharerPayload.title;
const SHARER_TITLE = sharerPayload.subtitle;
const DEFAULT_DESCRIPTION = sharerPayload.description;

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
        {post.tags && typeof post.tags == "object" && post.tags.length ? (
          <meta name="keywords" content={post.tags?.join(",")} />
        ) : (
          <></>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Rohan Kumar Thakur" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.image_url.String} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.description.String} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tweets_thakur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Box className={styles.main}>
          {post ? (
            <>
              <Typography variant="h3" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Box>
                {post?.tags?.length && typeof post?.tags == "object" ? (
                  post?.tags?.map((tag, index) => (
                    <Chip key={index} sx={{ m: 1 }} label={tag} />
                  ))
                ) : (
                  <></>
                )}
              </Box>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  {format(new Date(post.created_at.Time), "MMM dd yyyy")}
                </Typography>
              </Box>
              <Box className={styles.content}>
                {post?.source?.String ? (
                  <Suspense fallback={<p>Loading...</p>}>
                    <MDRenderer source={post?.source?.String} />
                  </Suspense>
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
                  <TwitterIcon fontSize="large" className={styles.socialItem} />
                </IconButton>
                <IconButton
                  className="custom-share-button"
                  onClick={() =>
                    customSharer(
                      SHARER_TITLE,
                      SHARER_TEXT,
                      window.location.href
                    )
                  }
                >
                  <ShareIcon fontSize="large" className={styles.socialItem} />
                </IconButton>
              </Box>
              <Box>{/* <Comments commentList={post.comments} /> */}</Box>
            </>
          ) : (
            <SkeletonCard />
          )}
          <AdsContainer />

          <CommentSection />
        </Box>
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps = async (context: { params: Params }) => {
  try {
    let { postId } = context.params as Params;

    let url = environments.baseUrl + "posts/" + postId;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (!response.status) {
      throw new Error("Post not found!");
    }

    let post: IPostItem = data?.payload;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  let url = environments.baseUrl + "posts/slugs/" + STATIC_SLUG_LENGTH;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (!data.status) {
    throw new Error("Slugs not found!");
  }
  let payload: ISlugEntity[] = data?.payload;
  let slugs = payload.map((s: ISlugEntity) => ({
    params: { postId: s.String },
  }));

  return {
    paths: slugs,
    fallback: "blocking",
  };
};

export default PostPage;
