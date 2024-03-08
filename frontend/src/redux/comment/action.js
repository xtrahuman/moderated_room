import axios from "axios";
import { localBackendUrl } from "../../utility";
import { getUserFunc } from "../authentication/action";
import { getCommentLike } from "../comment_like/action";
export const GETCOMMENTSUCCESS = "comment/get/success";
export const COMMENTSTART = "comment/iniate/start";
export const CREATECOMMENTSUCCESS = "comment/send/success";
export const COMMENTFAILURE = "comment/iniate/failure";

const comments_url = (post_id) =>
  `${localBackendUrl}/posts/${post_id}/comments`;

const commentStart = () => ({
  type: COMMENTSTART,
});

export const getComment = (comments) => {
  return {
    type: GETCOMMENTSUCCESS,
    payload: comments,
  };
};

export const getAllComment = (userToken, post_id) => async (dispatch) => {
  try {
    dispatch(commentStart());
    const comments = await getCommentFunc(userToken, post_id);

    if (!Array.isArray(comments.post_comments)) {
      throw new Error('Comments is not an array');
    }

    // Dispatch comments immediately, before processing likes
    dispatch(getComment(comments.post_comments));
    dispatch(getCommentLike(post_id))
    
  } catch (err) {
    console.error('Error in getAllComment:', err);
    dispatch(commentFailure(err));
  }
};



const createCommentSuccess = (message) => {
  return {
    type: CREATECOMMENTSUCCESS,
    payload: message,
  };
};

const commentFailure = (error) => ({
  type: COMMENTFAILURE,
  payload: error,
});

export const getCommentFunc = async (userToken, post_id) => {
  try {
    let comments;

    let headers = {};
    if (userToken) {
      headers = {
        Authorization: `Bearer ${userToken}`,
      };
    }

    const response = await axios.get(comments_url(post_id), { headers });
    comments = response.data;

    const commentWithDetails = await Promise.all(
      comments.post_comments.map(async (comment) => {
        if (comment.user_id) {
          const userDetails = await getUserFunc(userToken, comment.user_id);
          return {
            ...comment,
            username: userDetails.username,
            avatarUrl: userDetails.avatarUrl,
          };
        }
      })
    );

    comments = {
      count: comments.count,
      post_comments: commentWithDetails,
    };
    return comments;
  } catch (err) {

    throw err; // Re-throw the error to propagate it up
  }
};

export const createComment =
  (comment, post_id, resetComment, token) => (dispatch) => {
    dispatch(commentStart());
    axios
      .post(comments_url(post_id), comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        createCommentSuccess(response.data);
        dispatch(getAllComment(token, post_id)); // Pass navigate as the onSuccess callback later
        resetComment();
      })
      .catch((err) => {
        dispatch(commentFailure(err.response?.data?.error));
      });
  };

export default createComment;
