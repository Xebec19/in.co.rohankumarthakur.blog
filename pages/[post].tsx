import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Avatar,
  Box,
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

const Body = () => {
  return (
    <>
      <p>
        Writing "Hello, world!" in Rust is a straightforward task. First, open
        your preferred code editor and create a new file. Then, type or copy and
        paste the following code into the file:
      </p>
      <pre>
        <code>fn main() {'println!("Hello, world!");'}</code>
      </pre>
      <p>
        This is the basic structure of a Rust program. The{" "}
        <code>fn main()</code> line indicates the starting point of the program,
        and <code>println!("Hello, world!")</code> is the instruction to print
        the message "Hello, world!" to the console. Once you have typed this
        code, save the file with a .rs extension, such as "hello.rs". Finally,
        navigate to the directory where the file is saved in your terminal, and
        use the <code>rustc</code> command to compile the program. Once
        compiled, you can run the program by entering <code>./hello</code> in
        the terminal, and the message "Hello, world!" should be printed to the
        console.
      </p>
    </>
  );
};

const PostPage: React.FC<{ post: IPostItem }> = ({ post }) => {
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
              <Body />
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
        post: {
          id: "9b588811-c8d2-47e4-bc86-30c933520731",
          title: "Future of web development",
          image_url: {
            String:
              "https://symmetrical-carnival.s3.ap-south-1.amazonaws.com/publicprefix/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg",
            Valid: true,
          },
          image_reference: {
            String:
              "https://unsplash.com/@lautaroandreani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
            Valid: true,
          },
          created_at: {
            Time: "2023-04-16T19:23:09.307508Z",
            Valid: true,
          },
          updated_at: {
            Time: "2023-04-16T19:23:09.307508Z",
            Valid: true,
          },
          description: {
            String:
              "Web development has come a long way since the early days of static HTML pages. Today, the web is a dynamic and interactive platform that allows for real-time communication, multimedia content, and complex data processing. As technology continues to evolve at a rapid pace, the future of web development is poised to bring even more exciting innovations to the table.",
            Valid: true,
          },
          source: {
            String:
              "https://symmetrical-carnival.s3.ap-south-1.amazonaws.com/publicprefix/FUTURE_OF_WEB_DEVELOPMENT.md",
            Valid: true,
          },
          tags: ["web development"],
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

export default PostPage;
