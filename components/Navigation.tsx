import { InputAdornment, TextField } from "@material-ui/core";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Box>
      <AppBar className={styles.navBand}>
        <Toolbar className={styles.navIconsList}>
          <Box className={styles.navFront}>
            <Avatar
              alt="Rohan's pic"
              src="/author.png"
              className={styles.profilePic}
            />
            <TextField
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
            />
          </Box>
          <EmailIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
