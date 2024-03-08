import { FiMessageSquare } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userprofile } from "../utility";
// import createRoomMembership, { getRoomMembership } from "../redux/post_like/action";

const styles = {
  postContainer: {
    display: "flex",
    padding: "16px",
  },
  userInfo: {
    display: "flex",
    alignItems: "start",
    marginBottom: "12px",
  },
  userAvatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "12px",
  },
  username: {
    fontWeight: "bold",
  },
  postContent: {
    marginBottom: "12px",
  },
  postActions: {
    display: "flex",
    gap: "20px",
    marginBottom: "12px",
  },
  commentsSection: {
    marginBottom: "12px",
  },
  commentsList: {
    listStyle: "none",
    padding: "0",
  },
  commentItem: {
    marginBottom: "8px",
  },
  commentUser: {
    fontWeight: "bold",
    marginRight: "4px",
  },
};

const RoomList = ({ rooms }) => {
  const { loggedin } = useSelector((state) => state.userDetails);
  const { likes } = useSelector((state) => state.likeReducer);
  // const dispatch = useDispatch();
  console.log(rooms,'testing login')
  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    // dispatch(getRoomMembership());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postLikes = (postId) => {
    const postLikes = likes?.find((like) => like.post_id === postId);
    return postLikes;
  };

  return (
    <div className="[&>*:nth-child(1)]:rounded-t-lg w-full">
      {rooms?.groups?.map(
        ({ id, name, description }) => (
          <div
            className="flex bg-white relative border-t-2 border-[#f3f7f0] first:border-t-0 shadow-xs shadow-[#3AAFA9] z-1 w-full"
            key={id}
          >
            <div
              style={styles.postContainer}
              className="flex flex-col w-full"
            >
              <div className="user-info" style={styles.userInfo}>

                <div className="flex flex-col content-width">
                  <div
                    className="w-full flex"
                  >
                    <h3 className="crop-text post-detailname-width" style={styles.username}>{name}</h3>
                  </div>
                  <div className="flex w-full">
                    <p
                      className="flex break-words w-full"
                      style={styles.postContent}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[80px] block mt-4"
            >
              <button
                onClick={() =>
                  loggedin
                    ? 
                    // dispatch(
                    //     createRoomMembership(
                    //       id,
                    //       () => getRoomMembership(),
                    //       userProfile?.token
                    //     )
                    //   )
                    console.log("logged in")
                    : console.log("not logged in")
                }
                className="bg-blue-500 text-lg px-3 py-1 text-white rounded-lg"
              >
              join</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RoomList;
