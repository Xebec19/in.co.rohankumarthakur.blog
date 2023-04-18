import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import Grid from "@mui/material/Grid";
import { subDays } from "date-fns";
import Author from "@/components/Author";
import Typography from "@mui/material/Typography";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";
import SkeletonList from "@/components/SkeletonList";
import { IPost, IResponse } from "@/interfaces";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Rohan Thakur</title>
        <meta
          name="description"
          content="Welcome to my personal blogging website! As a web developer with 2 years of experience,
          I love sharing my knowledge and passion for all things tech-related. Here you'll find a variety
          of blog posts on web development, software hacks, and other DIY projects. Whether you're a 
          seasoned pro or just starting out, my blog is the perfect place to learn and grow your skills. 
          Stay up-to-date with the latest trends and techniques in the tech world and join the 
          conversation by leaving your thoughts and comments."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Grid container spacing={0} className={styles.main}>
          <Grid item md={8} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {"Blogs"}
            </Typography>
            {posts.length > 0 ? (
              <PostList list={posts} />
            ) : (
              <SkeletonList limit={10} />
            )}
          </Grid>
          <Grid item md={4} xs={12}>
            <Author />
          </Grid>
        </Grid>
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    let url = process.env.BASE_URL + "posts/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    if (!response.status) {
      throw new Error("no post available!");
    }

    let posts = response?.payload?.map((post) => ({
      id: post.id,
      title: post.title,
      createdAt: post.created_at.Time,
      description: post.description.String,
      updatedAt: post.updated_at.Time,
      image: post.image_url.String,
      imageSource: post.image_reference.String,
      tags: post.tags,
    }));

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
