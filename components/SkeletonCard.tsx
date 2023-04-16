import { Card, Skeleton } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Card sx={{ m: 1, p: 1 }} variant="outlined">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      <Skeleton variant="rectangular" width={210} height={120} sx={{ m: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      <Skeleton variant="rectangular" width={90} height={30} sx={{ m: 1 }} />
    </Card>
  );
};

export default SkeletonCard;
