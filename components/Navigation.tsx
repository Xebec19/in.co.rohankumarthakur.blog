import React from "react";
import useSWR from "swr";
import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import styles from "../styles/Navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "@/hooks/useSearch";

const Navigation = () => {
  const searchRef = React.useRef(null);

  const { results, search } = useSearch();

  console.log(results);

  async function onSearchHandler() {
    let searchText = searchRef.current?.value || "";
    search(searchText);
    searchRef.current.focus();
    searchRef.current.click();
  }

  async function onChangeHandler(event, option) {
    console.log(option?.value);
  }

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
              open={!!results}
              options={results}
              onChange={onChangeHandler}
              sx={{ width: 200 }}
              size="small"
              renderInput={(params) => (
                <TextField inputRef={searchRef} {...params} />
              )}
            />
            &nbsp;
            <IconButton onClick={onSearchHandler}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
