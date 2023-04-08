import { InputAdornment, TextField } from "@material-ui/core";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Box>
      <AppBar>
        <Toolbar className={styles.navIconsList}>
          <TextField
            variant="outlined"
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
          <EmailIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
