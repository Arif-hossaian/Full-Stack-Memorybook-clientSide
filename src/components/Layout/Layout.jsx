import { AppBar, Container, Grid, Grow, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Form, Posts } from "../../components";
import { useDispatch } from "react-redux";
import { getPosts } from "../../Actions/posts.js";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Paginate from "../Pagination/Pagination";
import useStyles from "./styles.js";
import CustomeInput from "./../Auth/custom/CustomeInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Layout = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post
    }
  };
  const handleAdd = () => {};
  const handleDelete = () => {};
  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <CustomeInput
                  name="search"
                  label="Search memories"
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  className={classes.chipInputStyle}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search tags"
                />
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper className={classes.pagination} elevation={6}>
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Layout;
