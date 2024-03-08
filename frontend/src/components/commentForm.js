import React, { useState } from "react";
import createComment from "../redux/comment/action";
import {userprofile} from "../utility";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const CommentForm = () => {
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch()
  const { post_id } = useParams();

  const handleInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const resetCommentForm = () => {
    setCommentContent('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      content: commentContent
    };
    
    dispatch(createComment(commentObj,post_id,resetCommentForm,userprofile()?.token));

  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg mb-2 p-2">
      <label>
        <textarea
          type="text"
          placeholder="Anonymously comment on this post"
          className="text-black w-full h-[auto] outline-0 outline-homegreen"
          value={commentContent}
          maxLength={500}
          minLength={1}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <div className="flex justify-end items-end">
        
        <button
          type="submit"
          className="bg-homegreen text-white px-3 py-1 rounded-lg"
        >
          comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
