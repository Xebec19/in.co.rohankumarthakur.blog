import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Divider, IconButton } from "@mui/material";
import styles from "./Author.module.css";

const Author = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default React.memo(Author);
