import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import Grid from "@mui/material/Grid";
import Author from "@/components/Author";
import Typography from "@mui/material/Typography";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";
import SkeletonList from "@/components/SkeletonList";
import { IPost, IPostItem, IResponse } from "@/interfaces";
import AdsContainer from "@/components/AdsContainer";

const DESCRIPTION = `Welcome to my personal blogging website! As a web developer with 2 years of experience,
I love sharing my knowledge and passion for all things tech-related. Here you'll find a variety
of blog posts on web development, software hacks, and other DIY projects. Whether you're a 
seasoned pro or just starting out, my blog is the perfect place to learn and grow your skills. 
Stay up-to-date with the latest trends and techniques in the tech world and join the 
conversation by leaving your thoughts and comments.`;

const Home: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Rohan Thakur</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="webdevelopment, react, go, coding, website, nextjs, Web development tips and tricks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Rohan's blogs" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="/author.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tweets_thakur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Grid container spacing={0} className={styles.container}>
          <Grid item md={8} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {"Blogs"}
            </Typography>
            {posts && posts.length > 0 && typeof posts === "object" ? (
              <PostList list={posts} />
            ) : (
              <SkeletonList limit={10} />
            )}
            <AdsContainer />
          </Grid>
          <Grid item md={4} xs={12}>
            <Author />
          </Grid>
        </Grid>
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
    }));

    return {
      props: {
        posts,
      },
      // Re-generate the post at most once per second
      // if a request comes in
      revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default Home;
