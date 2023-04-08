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
import Author from "@/components/Author";
import { formatDistance, subDays } from "date-fns";
import { Typography } from "@material-ui/core";

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
              {"Rohan's Blogs"}
            </Typography>
            <List>
              <ListItem>
                <Card>
                  <CardHeader
                    title="Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps"
                    subheader={formatDistance(
                      subDays(new Date(), 3),
                      new Date(),
                      { addSuffix: true }
                    )}
                  />
                  <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis, omnis porro dignissimos eius quia id. Quo fuga
                    reprehenderit voluptatem accusamus impedit iusto ipsa ipsam
                    vero aliquid natus, dolorum dicta ex?
                  </CardContent>
                  <CardActions>
                    <Button>View Full Story</Button>
                  </CardActions>
                </Card>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4} xs={12}>
            <Author />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
