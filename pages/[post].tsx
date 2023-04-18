import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import styles from "../styles/Post.module.css";
import Head from "next/head";
import { format, formatRelative, subDays } from "date-fns";
import { ListSubheader, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShareIcon from "@mui/icons-material/Share";
import { stringAvatar } from "@/utils/data-format";
import { IPostItem } from "@/interfaces";
import SkeletonCard from "@/components/SkeletonCard";
import React, { useEffect } from "react";
import MDRenderer from "@/components/MDRenderer";
import BlogSkeleton from "@/components/BlogSkeleton";
import { CardMedia } from "@material-ui/core";
import Image from "next/image";

const CommentInput = ({ handlePush }) => {
  return <></>;
};

const Comments = ({ commentList }) => {
  const handlePush = ({ author, comment, date }) => {
    // todo it pushes new comment to source
  };
  return (
    <>
      <CommentInput handlePush={handlePush} />
      <List subheader={<ListSubheader component="div">Comments</ListSubheader>}>
        {commentList.map((comment, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Avatar {...stringAvatar(comment.author)} />
            </ListItemIcon>
            <ListItemText
              primary={comment.comment}
              secondary={format(new Date(2014, 1, 11), "MM/dd/yyyy")}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

const Body: React.FC<{ source: string }> = ({ source }) => {
  useEffect(() => {});

  return <></>;
};

const PostPage: React.FC<{ post: IPostItem }> = ({ post }) => {
  console.log({ post });

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
        <title>Rohan Thakur</title>
        <meta
          name="description"
          content={
            post?.description
              ? post.description.String
              : `Welcome to my personal blogging website! As a web developer with 2 years of experience,
          I love sharing my knowledge and passion for all things tech-related. Here you'll find a variety
          of blog posts on web development, software hacks, and other DIY projects. Whether you're a 
          seasoned pro or just starting out, my blog is the perfect place to learn and grow your skills. 
          Stay up-to-date with the latest trends and techniques in the tech world and join the 
          conversation by leaving your thoughts and comments.`
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        {post ? (
          <Box className={styles.main}>
            <Typography variant="h3" component="div" gutterBottom>
              {post.title}
            </Typography>
            <Box className={styles.metaInfo}>
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
            </Box>
            <Box className={styles.content}>
              {post?.source?.String ? (
                <MDRenderer source={post?.source?.String} />
              ) : (
                <BlogSkeleton />
              )}
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
