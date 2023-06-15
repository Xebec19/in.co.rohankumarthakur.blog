import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "../styles/Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Toolbar>
        <Box>{"Build by Rohan Thakur"}</Box>
      </Toolbar>
    </Box>
  );
};

export default React.memo(Footer);
