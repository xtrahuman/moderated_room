import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { NavLink, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherUserDetails, getOtherUserProfile } from "../redux/authentication/action";
import { userprofile } from "../utility";
import SideFeatures from "./extraSideFeatures";
import { MdOutlineEmail } from "react-icons/md";
import PostList from "./postList";
import { getAllPost, getUserPostLike } from "../redux/room/action";
import handleMessageInterface from "../redux/domManipulation/action";

const UserProfileDetails = () => {
  const { user,otherUser,loggedin } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const {id} = useParams()
  let userProfile = userprofile()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile()
    dispatch(getOtherUserDetails(userProfile?.token,id));

    return () => {
      dispatch(getOtherUserProfile({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const isUser = () => loggedin && user && user.id === id

  const displayUser = isUser() ? user : otherUser


  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="md:w-[70%] w-[100%] flex-col">
        <div className="card !mb-0 py-6 bg-white">
          <div className="card-body pb-0">
            <div className="flex items-center">
              <div className="w-[25%]">
                <div className="flex flex-col items-center border-r-2">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/project_avatar/${displayUser?.avatarUrl}`
                    }
                    className="img-fluid avatar-xxl rounded-circle"
                    alt=""
                  />
                  <h4 className="crop-text text-homegreen w-full font-bold px-2 mt-3 mb-2">
                    {displayUser?.username}
                  </h4>
                  <h5 className="text-muted font-size-13 mb-0">{displayUser?.user_type}</h5>
                  <NavLink 
                  onClick={() => dispatch(handleMessageInterface(true))}
                  to={`/messages/${displayUser?.id}`}><MdOutlineEmail className="mt-3 mb-2 text-lg" /></NavLink>
                </div>
              </div>
              <div className="w-[75%]">
                <div className="mx-3">
                  <div>
                    <h4 className="font-bold text-top text-xl text-homegreen mb-2">
                    {displayUser?.user_type==='expert'? 'Biography' : 'Profile' }
                    </h4>
                    <p className="mb-0 text-muted">
                    {displayUser?.bio ? displayUser?.bio  : 'anonymously share your status' }
                    </p>
                  </div>
                  <div className="row my-4">
                    <div className="col-md-12">
                      <div>
                        <p className="text-grey mb-2 ">{displayUser?.username}</p>
                        {isUser() && <p className="text-grey mb-0">{displayUser?.email}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MyTabs />
      </div>
      <SideFeatures />
    </div>
  );
};

function MyTabs() {
  const { posts,likedposts } = useSelector((state) => state.postReducer);
  const { user, loggedin } = useSelector((state) => state.userDetails);
  const [elementCount] = useState(2); // Set your initial element count
  const [itemWidth, setItemWidth] = useState(`calc(100% / ${elementCount})`);
  const dispatch = useDispatch();
  const {id} = useParams()


  let userProfile = userprofile();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile = userprofile();
    dispatch(getAllPost(userProfile));
    dispatch(getUserPostLike(userProfile,id))
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const profileNav = [
    {
      id: 1,
      name: "posts",
      link: "/posts",
      getContent: () => dispatch(getAllPost(userProfile))
    },
    {
      id: 2,
      name: "likes",
      link: "/likes",
      getContent: () => dispatch(getUserPostLike(userProfile,id))
    },
    {
      id: 3,
      name: "bookmarks",
      link: "/bookmarks",
      getContent: ()=> null
    },
  ];

  
  useEffect(() => {
    // Update item width whenever elementCount changes
    setItemWidth(`calc(100% / ${elementCount})`);
  }, [elementCount]);

  const styles = {
    tabWidth: {
      width: itemWidth,
    },
  }

  const isUser = () => loggedin && user.id === id

  const userPosts = () => {
    const user_posts = posts?.filter((post) => post.user_id.toString() === id);
    return user_posts;
  };

  const navProfile =() => {
    if (isUser()) {
      return profileNav
    }
    else{
      return profileNav.filter((nav) => nav.name !== 'bookmarks' )
    }
  }


  return (
    <Tab.Group>
      <Tab.List
        className="nav mt-0 mb-2 bg-white border-t-2 nav-tabs flex w-full nav-tabs-custom border-bottom-0 mt-3 nav-justfied"
        role="tablist"
      >
        {navProfile().map(({ id, name, link,getContent }) => (
          <Tab
            key={id}
            className={`nav-item py-2 text-center border-r-2 last:border-r-0 ui-selected: outline-none`}
            style={styles.tabWidth}
            role="presentation"
          >
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button onClick={getContent} className={selected ? "nav-link active" : ""}>
                {name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel><PostList posts={userPosts()}/></Tab.Panel>
        <Tab.Panel><PostList posts={likedposts}/></Tab.Panel>
        {isUser() && <Tab.Panel>bookmarks</Tab.Panel>}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default UserProfileDetails;
