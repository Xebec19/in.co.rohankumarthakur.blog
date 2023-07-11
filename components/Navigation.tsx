import React from "react";
import useSWR from "swr";
import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import styles from "../styles/Navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";

const fetcher = async () => {
  let url = "/api/search";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const Navigation = () => {
  const { data, error } = useSWR("search", fetcher);
  const [searchResults, setSearchResults] = React.useState([]);
  const searchRef = React.useRef(null);

  function searchHandler() {}

  return (
    <Box>
      <AppBar className={styles.navBand}>
        <Toolbar className={styles.navIconsList}>
          <Box className={styles.navFront}>
            <Link className={styles.link} href={"/"}>
              <Avatar
                alt="Rohan's pic"
                src="/author.png"
                className={styles.profilePic}
              />
            </Link>
            <Autocomplete
              freeSolo
              id="id_search"
              options={searchResults}
              sx={{ width: 200 }}
              size="small"
              renderInput={(params) => (
                <TextField inputRef={searchRef} {...params} />
              )}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
