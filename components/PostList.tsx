import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Post from "./Post";
import { IPost } from "@/interfaces";

const PostList: React.FC<{ list: IPost[] }> = ({ list }) => {
  return (
    <List>
      {list.map((blog, key) => (
        <ListItem disableGutters key={key}>
          <Post item={blog} />
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(PostList);
