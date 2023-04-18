import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import styles from "./Author.module.css";
import Link from "next/link";

const Author = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.socialLinks}>
        <Link
          href="https://github.com/Xebec19"
          target="_blank"
          className={styles.link}
        >
          <IconButton>
            <GitHubIcon
              className={styles.socialItem}
              aria-label="rohan's github link"
              fontSize="large"
            />
          </IconButton>
        </Link>
        <Link
          href="https://www.linkedin.com/in/rohan-kumar-thakur/"
          target="_blank"
          className={styles.link}
        >
          <IconButton>
            <LinkedInIcon
              className={styles.socialItem}
              aria-label="rohan's linkedin link"
              fontSize="large"
            />
          </IconButton>
        </Link>
        <Link
          href="https://twitter.com/tweets_thakur"
          target="_blank"
          className={styles.link}
        >
          <IconButton>
            <TwitterIcon
              className={styles.socialItem}
              aria-label="rohan's twitter account link"
              fontSize="large"
            />
          </IconButton>
        </Link>
      </Box>
      <Divider />
      <Box>
        <Paper variant="outlined" square className={styles.about}>
          <Typography variant="h5" component="h5" color="textSecondary">
            About
          </Typography>
          <Typography
            variant="body1"
            component="div"
            color="body.secondary"
            className={styles.text}
          >
            Rohan Thakur is a skilled developer with 2+ years of experience in
            Node.js, React, and Angular. He has worked for Fishyhub and
            Districtd and is currently at Outscal, an edtech company, using
            React, Node.js, and MongoDB to build e-learning platforms. Rohan is
            always eager to learn and passionate about using technology to
            create impactful learning experiences.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default React.memo(Author);
