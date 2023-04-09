import React from "react";
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
import Post from "./Post";

const PostList = ({ list }) => {
  return (
    <List>
      {list.map((blog, key) => (
        <ListItem key={key}>
          <Post item={blog} />
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(PostList);
