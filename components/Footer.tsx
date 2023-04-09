import { InputAdornment, TextField } from "@material-ui/core";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Footer.module.css";
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
