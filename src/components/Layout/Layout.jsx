import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  TextField,
  Paper,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Form, Posts } from "../../components";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../Actions/posts.js";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Paginate from "../Pagination/Pagination";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Layout = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(
        getPostBySearch({
          search,
          tags: tags.join(","),
        })
      );
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }else{
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagDelete) =>
    setTags(tags.filter((tag) => tag !== tagDelete));

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
                <TextField
                  onKeyDown={handleKeyPress}
                  name="search"
                  variant="standard"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  className={classes.chipInputStyle}
                  value={tags}
                  onAdd={(chip) => handleAdd(chip)}
                  onDelete={(chip) => handleDelete(chip)}
                  label="Search tags"
                />
                <Button
                  className={classes.searchButton}
                  color="primary"
                  variant="outlined"
                  onClick={searchPost}
                >
                  Search
                </Button>
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
