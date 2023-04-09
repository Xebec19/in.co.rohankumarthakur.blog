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
import { formatDistance, subDays } from "date-fns";

const Post = ({ item }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={item.title}
        subheader={formatDistance(item.createdOn, new Date(), {
          addSuffix: true,
        })}
      />
      <CardContent>{item.description}</CardContent>
      <CardActions>
        <Button>View Full Story</Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(Post);
