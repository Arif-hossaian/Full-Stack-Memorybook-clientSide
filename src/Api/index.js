import Axios from "axios";

const API_URL = "http://localhost:8000/posts";

export const fetchPosts = () => Axios.get(API_URL);
export const createPost = (newPost) => Axios.post(API_URL, newPost);
export const updatePost = (id, updatedPost) =>
  Axios.patch(`${API_URL}/${id}`, updatedPost);
