import { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";
import { createPost, updatePost } from "../../Actions/posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const onValueChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create, Like, Delete any post of Memorybook
          application
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing` : `Creating`} a memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          required
          value={postData.title}
          onChange={(e) => onValueChange(e)}
          fullWidth
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          required
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
          required
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
