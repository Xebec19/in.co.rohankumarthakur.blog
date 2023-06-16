import { IconButton, InputAdornment, TextField } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const CommentSection = () => {
  return (
    <TextField
      id="multiline-text-field"
      fullWidth
      label="comment"
      multiline
      rows={4}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <ChatBubbleIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentSection;
