import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import styles from "./Author.module.css";

const Author = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.socialLinks}>
        <IconButton>
          <GitHubIcon
            className={styles.socialItem}
            aria-label="rohan's github link"
            fontSize="large"
          />
        </IconButton>
        <IconButton>
          <LinkedInIcon
            className={styles.socialItem}
            aria-label="rohan's linkedin link"
            fontSize="large"
          />
        </IconButton>
        <IconButton>
          <TwitterIcon
            className={styles.socialItem}
            aria-label="rohan's twitter account link"
            fontSize="large"
          />
        </IconButton>
      </Box>
      <Divider />
      <Box>
        <Paper variant="outlined" square className={styles.about}>
          <Typography variant="h5" component="h5" color="textSecondary">
            About
          </Typography>
          <Typography variant="body1" component="div" color="body.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            itaque a. Perspiciatis, nihil, dicta saepe eaque ducimus odio iure
            aliquid tempora dignissimos quod a repellat obcaecati, sunt at esse
            consequuntur?
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default React.memo(Author);
