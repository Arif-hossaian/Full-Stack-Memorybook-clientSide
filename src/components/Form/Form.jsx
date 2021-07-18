import { useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux"
import useStyles from "./styles.js";
import { createPost } from "../../Actions/posts.js";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const onValueChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const clear = () => {
    // setCurrentId(0);
    // setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(postData))
  };
  console.log(postData);

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          required
          value={postData.creator}
          onChange={(e) => onValueChange(e)}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => onValueChange(e)}
          fullWidth
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          onChange={(e) => onValueChange(e)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          value={postData.tags}
          onChange={(e) => onValueChange(e)}
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
