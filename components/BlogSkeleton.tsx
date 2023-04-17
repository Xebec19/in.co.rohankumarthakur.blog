import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import classes from "./BlogSkeleton.module.css";
import { Paper, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <>
      <Paper sx={{ m: 5, p: 5 }} variant="outlined">
        <Skeleton variant="text" width={400} sx={{ fontSize: "2rem" }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
        {[...Array(15)].map((_, index) => (
          <Skeleton key={index} variant="text" width="100%" height={20} />
        ))}
      </Paper>
    </>
  );
}
