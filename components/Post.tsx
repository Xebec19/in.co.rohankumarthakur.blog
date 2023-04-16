import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { formatDistance, subDays } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { ImgLoader } from "@/lib/imageLoader";
import styles from "./Post.module.css";

interface IPost {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  imageSource: string;
  tags?: string[] | null;
  title: string;
  updatedAt: string;
}

const Post: React.FC<{ item: IPost }> = ({ item }) => {
  return (
    <Link href={`/${item.id}`} className={styles.link}>
      <Card variant="outlined">
        <CardHeader
          title={item.title}
          subheader={formatDistance(new Date(item.createdAt), new Date(), {
            addSuffix: true,
          })}
        />
        <CardMedia>
          <Image
            loader={ImgLoader}
            src={item.image}
            alt={item.imageSource}
            width={600}
            height={300}
            quality={45}
          />
        </CardMedia>
        <CardContent>{item.description}</CardContent>
        <CardActions></CardActions>
      </Card>
    </Link>
  );
};

export default React.memo(Post);
