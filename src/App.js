import React from "react";
import { AppBar, Container, Grow, Grid, Typography } from "@material-ui/core";
import { Form, Posts } from "./components";
import styles from "./styles/App.module.css";

const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar className={styles.appBar} position="static" color="inherit">
        <Typography className={styles.heading} variant="h2" align="center">
          Memorybook
        </Typography>
        <img
          src="https://i.ibb.co/D8ZfSTG/memroy-book.png"
          alt="Memorybook"
          className={styles.memoryBookImage}
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
