import * as API from "../Api";

//Action creator
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPosts();
    dispatch({
      type: "FETCH_aLL",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async(dispatch) => {
  try {
    const {data} = await API.createPost(post)
    dispatch({
      type: "CREATE",
      payload: data,
    })
  } catch (error) {
    console.log(error);
  }
}