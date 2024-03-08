import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../assets/mentalhealth.png";
import Container from "./container";
import useSticky from "./sticky";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUserDetails } from "../redux/authentication/action";
import { userprofile } from "../utility";
import { BsChevronDown } from "react-icons/bs";
import { RiHome7Line } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  const mobileToggle = document.querySelector("#mobile_menu");
  const nav = document.querySelector(".nav-flex");
  const bodyfixed = document.querySelector("body");
  const { sticky, stickyRef } = useSticky();
  const { user, loggedin } = useSelector((state) => state.userDetails);
  const { messageOpen } = useSelector((state) => state.domStatus);
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const location = useLocation();

  const NavVariable = [
    {
      id: 1,
      name: "home",
      link: "/home",
      icon: <RiHome7Line />,
    },
    {
      id: 2,
      name: "messages",
      link: "/messages",
      icon: <MdOutlineMessage />,
    },
    // {
    //   id: 3,
    //   name: "search",
    //   link: "/search",
    //   icon: <FiSearch />,
    // },
    {
      id: 4,
      name: "notification",
      link: "/notification",
      icon: <IoIosNotificationsOutline />,
    },
    // {
    //   id: 5,
    //   name: "group",
    //   link: "/group",
    //   icon: <HiOutlineUserGroup />,
    // },
  ];

  const LoggedInVar = [
    {
      id: 1,
      name: "profile",
      link: `/profile/${user?.id}`,
    },
    {
      id: 4,
      name: "logout",
      link: "/logout",
    },
  ];

  const LoggedOutVar = [
    {
      id: 1,
      name: "login",
      link: "/login",
    },
  ];

  const mobilemenu = () => {
    mobileToggle.classList.toggle("toggle-menu");
    nav.classList.toggle("toggle");
    bodyfixed.classList.toggle("static");
  };

  const closeMobileMenu = () => {
    if (nav.classList.contains("toggle")) {
      mobileToggle.classList.toggle("toggle-menu");
      nav.classList.toggle("toggle");
      bodyfixed.classList.toggle("static");
    }
  };

  let userProfile = userprofile();

  useEffect(() => {
    if (userProfile) {
      dispatch(
        getUserDetails(userProfile?.token, userProfile?.uuid, () => null)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="shadow-sm relative bg-white shadow-[#D7F7CA]">
      <div
        className={`menubar absolute z-[11] ${
          location.pathname.includes("messages") && messageOpen
            ? "mobile-hidden"
            : "menubar"
        }`}
        id="mobile_menu"
        onClick={mobilemenu}
      >
        <div className="vector"></div>
        <div className="vector"></div>
        <div className="vector"></div>
      </div>
      <nav
        ref={stickyRef}
        className={`flex flex-col ${
          sticky ? "sticky" : ""
        }  font-semibold py-6 px-2 gap-y-5 capitalize w-full nav-flex h-[100vh]`}
      >
        <ul className="nav-header a-center flex flex-col items-center gap-x-3 w-40%">
          <NavLink onClick={closeMobileMenu} to="/">
            <img className="w-[100px] h-[auto]" src={Icon} alt="logo" />
          </NavLink>
        </ul>
        <ul className="nav-ul md:flex  md:flex-col grid justify-center md:gap-y-5  w-[60%]  md:h-[100vh] h-[70vh] items-start a-center">
          {NavVariable.map((NavVar) =>
            ["profile", "messages"].includes(NavVar.name) ? (
              <li key={NavVar.id}>
                <NavLink
                  to={loggedin ? NavVar.link : "/login"}
                  className={(navData) =>
                    //   navData.isActive ? "text-[#feffff]" : ""
                    navData.isActive && loggedin ? "text-homegreen" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  <div className="flex gap-1 items-center text-lg">
                    {NavVar.icon}
                    <span className="md:text-sm text-lg">{NavVar.name}</span>
                  </div>
                </NavLink>
              </li>
            ) : (
              <li key={NavVar.id}>
                <NavLink
                  to={NavVar.link}
                  className={(navData) =>
                    //   navData.isActive ? "text-[#feffff]" : ""
                    navData.isActive ? "text-homegreen" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  <div className="flex gap-1 items-center text-lg">
                    {NavVar.icon}
                    <span className="md:text-sm text-lg">{NavVar.name}</span>
                  </div>
                </NavLink>
              </li>
            )
          )}
          {loggedin ? (
            <UserPopUp
              key="loggedin"
              items={LoggedInVar}
              loggedin={loggedin}
              user={user}
              closeMobileMenu={closeMobileMenu}
            />
          ) : (
            <UserPopUp
              key="loggedout"
              items={LoggedOutVar}
              loggedin={loggedin}
              user={user}
              closeMobileMenu={closeMobileMenu}
            />

          )}
        </ul>
      </nav>
    </Container>
  );
};

const UserPopUp = ({ mykey, items, loggedin, user, closeMobileMenu }) => {
  const dispatch = useDispatch();
  return (
    <li key={mykey} className="mt-[auto] self-end">
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button
            className={`${
              loggedin ? "relative" : "p-3"
            } bg-homegreen flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:[#e4d804] `}
          >
            <span className="sr-only">oper user menu</span>
            <div className="overflow-hidden flex gap-1 items-center">
              {loggedin ? (
                <>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/project_avatar/avatar1.png`
                    }
                    alt={user?.username}
                    style={{
                      width: "40px",
                      height: "40px",
                      maxWidth: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="bg-homegreen opacity-50 absolute transition ease-in-out hover:opacity-70"
                    style={{
                      width: "40px",
                      height: "40px",
                      maxWidth: "40px",
                      borderRadius: "50%",
                    }}
                  ></div>
                </>
              ) : (
                ""
              )}
              <span
                className={`${
                  loggedin
                    ? `absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]`
                    : ""
                }`}
              >
                <BsChevronDown className="text-white font-bold" />
              </span>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute bottom-8 left-[20px] mt-2 w-48 rounded-md shadow-lg py-1 bg-[#0D1B2A] bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <Menu.Item>
              {({ active }) => (
                <>
                  {loggedin ? <p className="md:px-4 text-[#333] text-sm">{user?.username}</p> : ''}
                  {items.map(({ id, name, link }) =>
                    name === "logout" ? (
                      <span
                        onClick={() => dispatch(logout())}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block md:px-4 py-2 text-sm text-[#333] cursor-pointer hover:text-homegreen flex"
                        )}
                      >
                        {name}
                      </span>
                    ) : (
                      <NavLink
                        key={id}
                        to={link}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block md:px-4 py-2 text-sm text-[#333] cursor-pointer hover:text-homegreen flex"
                        )}
                        onClick={closeMobileMenu}
                      >
                        {name}
                      </NavLink>
                    )
                  )}
                </>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
};

export default Navbar;
