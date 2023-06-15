import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import Grid from "@mui/material/Grid";
import Author from "@/components/Author";
import Footer from "@/components/Footer";
import {
  AUTHOR,
  DESCRIPTION,
  KEYWORDS,
  OGTITLE,
  TWITTERSITE,
} from "@/config/default-values";
import Typography from "@mui/material/Typography";
import PostList from "@/components/PostList";
import SkeletonList from "@/components/SkeletonList";
import { IPost, IPostItem, IResponse } from "@/interfaces";
import AdsContainer from "@/components/AdsContainer";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Suspense } from "react";

const Home: NextPageWithLayout<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <>
      <Grid container spacing={0} className={styles.container}>
        <Grid item md={8} xs={12}>
          <Typography gutterBottom variant="h4" component="div">
            {"Blogs"}
          </Typography>
          {posts && posts.length > 0 && typeof posts === "object" ? (
            <Suspense fallback={<h1>Loading...</h1>}>
              <PostList list={posts} />
            </Suspense>
          ) : (
            <SkeletonList limit={10} />
          )}
          <AdsContainer />
        </Grid>
        <Grid item md={4} xs={12}>
          <Author />
        </Grid>
      </Grid>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>{AUTHOR}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={OGTITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="/author.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTERSITE} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        {page}
        <Footer />
      </main>
    </>
  );
};

export async function getStaticProps() {
  try {
    let url = process.env.BASE_URL + "posts/";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    if (!data.status) {
      throw new Error("no post available!");
    }

    let posts = data?.payload?.map((post: IPostItem) => ({
      id: post.id,
      title: post.title,
      createdAt: post.created_at.Time,
      description: post.description.String,
      updatedAt: post.updated_at.Time,
      image: post.image_url.String,
      imageSource: post.image_reference.String,
      tags: post.tags,
      slug: post.slug.String,
    }));

    return {
      props: {
        posts,
      },
      // Re-generate the post at most once per second
      // if a request comes in
      revalidate: 30,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default Home;
