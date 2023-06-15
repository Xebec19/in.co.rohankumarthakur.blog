import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import styles from "../styles/Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <Box>
      <AppBar className={styles.navBand}>
        <Toolbar className={styles.navIconsList}>
          {/* <Box className={styles.navFront}> */}
          <Link className={styles.link} href={"/"}>
            <Avatar
              alt="Rohan's pic"
              src="/author.png"
              className={styles.profilePic}
            />
          </Link>
          {/* <TextField
              className={styles.searchBox}
              aria-label="Search blogs"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
          {/* </Box> */}
          {/* <EmailIcon /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
