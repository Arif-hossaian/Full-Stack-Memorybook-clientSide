import React from "react";
import styles from "./Posts.module.css";
import { CircularProgress, Grid } from "@material-ui/core";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);
  return (
      !posts.length ? (
        <div>
          Post is loading plz wait...<CircularProgress />
        </div>
      ) : (
        <Grid
          className={styles.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      )
  );
};

export default Posts;
