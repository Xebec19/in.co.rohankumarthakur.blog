import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { formatDistance } from "date-fns";
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
  slug: string;
}

const Post: React.FC<{ item: IPost }> = ({ item }) => {
  return (
    <Link href={`/${item.slug}`} className={styles.link}>
      <Card variant="outlined" className={styles.card}>
        <CardHeader
          className={styles.header}
          title={item.title}
          subheader={formatDistance(new Date(item.createdAt), new Date(), {
            addSuffix: true,
          })}
        />
        <CardMedia className={styles.cardMedia}>
          <Image
            loader={ImgLoader}
            src={item.image}
            alt={item.imageSource}
            width={600}
            height={300}
            quality={45}
          />
        </CardMedia>
        <CardContent className={styles.content}>{item.description}</CardContent>
      </Card>
    </Link>
  );
};

export default React.memo(Post);
