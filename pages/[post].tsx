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

const POST_DETAILS = {
  _id: 123,
  title: "Redux Toolkit for Beginners: Quick and Easy Setup in 3 Simple Steps",
  createdOn: subDays(new Date(), 3),
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo aut inventore exercitationem, quis magni aliquid perspiciatis, odio delectus dolores voluptatem possimus reprehenderit quidem voluptatum culpa blanditiis quam a corrupti.",
  tags: ["react", "redux", "web-development"],
  comments: [
    { _id: 123, author: "Rohan", comment: "hello world!", date: new Date() },
    { _id: 123, author: "Rohan", comment: "hello world!", date: new Date() },
    { _id: 123, author: "Rohan", comment: "hello world!", date: new Date() },
  ],
};

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

const PostPage = () => {
  return (
    <>
      <Head>
        <title>Rohan Thakur</title>
        <meta name="description" content={POST_DETAILS.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Box className={styles.main}>
          <Typography variant="h3" component="div" gutterBottom>
            {POST_DETAILS.title}
          </Typography>
          <Box className={styles.metaInfo}>
            <Box>
              {POST_DETAILS.tags.map((tag, index) => (
                <Chip key={index} sx={{ m: 1 }} label={tag} />
              ))}
            </Box>
            <Box>
              <Typography variant="body1" color="textSecondary">
                {format(POST_DETAILS.createdOn, "MMM dd yyyy")}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.content}>
            <Body />
          </Box>
          <Box>
            <Comments commentList={POST_DETAILS.comments} />
          </Box>
        </Box>
        <Footer />
      </main>
    </>
  );
};

export default PostPage;
