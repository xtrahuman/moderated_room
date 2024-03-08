import axios from "axios";
import { localBackendUrl } from "../../utility";
export const GETLIKESUCCESS = "commentlike/get/success";
export const LIKESTART = "commentlike/send/start";
export const CREATELIKESUCCESS = "commentlike/send/success";
export const LIKEFAILURE = "commentlike/send/failure";
const get_comment_likes_url = (post_id) =>
  `${localBackendUrl}/posts/${post_id}/comment_likes`;

const LikeStart = () => ({
  type: LIKESTART,
});

export const getLike = (likes) => {
  return {
    type: GETLIKESUCCESS,
    payload: likes.comments_with_likes,
  };
};

const createLikeSuccess = (message) => {
  return {
    type: CREATELIKESUCCESS,
    payload: message,
  };
};

const LikeFailure = (error) => ({
  type: LIKEFAILURE,
  payload: error,
});



export const getCommentLike = (post_id) => (dispatch) => {
  dispatch(LikeStart());
  axios
    .get(get_comment_likes_url(post_id))
    .then((response) => {
      dispatch(getLike(response.data)); // Pass navigate as the onSuccess callback later
    })
    .catch((err) => {
      dispatch(LikeFailure(err.response?.data?.error));
    });
};

export const createCommentLike =
  (comment_id,post_id, token) => (dispatch) => {
    dispatch(LikeStart());
    const data = {
      comment_id: comment_id,
    };
    axios
      .post(
        `${localBackendUrl}/comment_likes`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(createLikeSuccess(response.data));
        dispatch(getCommentLike(post_id));
      })
      .catch((err) => {
        dispatch(LikeFailure(err.response?.data?.error));
      });
  };

export default createCommentLike;
