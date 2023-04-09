import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { formatDistance, subDays } from "date-fns";
import Author from "@/components/Author";
import { Typography } from "@material-ui/core";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";

const LIST = [
  {
    _id: 123,
    title:
      "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
    createdOn: subDays(new Date(), 3),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
    tags: ["react", "redux", "web-development"],
    comments: [
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
    ],
  },
  {
    _id: 123,
    title:
      "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
    createdOn: subDays(new Date(), 3),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
    tags: ["react", "redux", "web-development"],
    comments: [
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
    ],
  },
  {
    _id: 123,
    title:
      "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
    createdOn: subDays(new Date(), 3),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
    tags: ["react", "redux", "web-development"],
    comments: [
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
    ],
  },
  {
    _id: 123,
    title:
      "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
    createdOn: subDays(new Date(), 3),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
    tags: ["react", "redux", "web-development"],
    comments: [
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
    ],
  },
  {
    _id: 123,
    title:
      "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
    createdOn: subDays(new Date(), 3),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
    tags: ["react", "redux", "web-development"],
    comments: [
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
      { _id: 123, author: "Rohan", comment: "hello world!" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Rohan Thakur</title>
        <meta
          name="description"
          content="Welcome to my personal blogging website! As a web developer with 2 years of experience, I love sharing my knowledge and passion for all things tech-related. Here you'll find a variety of blog posts on web development, software hacks, and other DIY projects. Whether you're a seasoned pro or just starting out, my blog is the perfect place to learn and grow your skills. Stay up-to-date with the latest trends and techniques in the tech world and join the conversation by leaving your thoughts and comments."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Grid container spacing={2} className={styles.main}>
          <Grid item md={8} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {"Blogs"}
            </Typography>
            <PostList list={LIST} />
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
