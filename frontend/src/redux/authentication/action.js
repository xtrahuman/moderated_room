import axios from "axios";
import { localBackendUrl } from "../../utility";
export const AUTHENTICATED  = "authenticated/getstatus";
export const GETOTHERUSERS  = "otherUsers/getprofile/success";
export const GETLOGINSTART = "login/getall/start";
export const GETUSERSTART = "otherUser/get/start";
export const GETLOGINSUCCESS = "login/getall/success";
export const LOGOUT = "logout/success"
export const GETLOGINFAILURE = "login/getall/failure";
export const GETUSERFAILURE = "otherUser/get/failure";

const getloginStart = () => ({
  type: GETLOGINSTART,
});

const getOtherUserStart = () => ({
  type: GETUSERSTART,
});

const getUserStart = () => ({
  type: GETUSERSTART,
});

export const getUserProfile  = (user) => ({
  type: AUTHENTICATED,
  payload: user
});

export const getOtherUsersProfile  = (user) => ({
  type: GETOTHERUSERS,
  payload: user
});

const getloginSuccess = (result) => {

  let user = result
  
    return {
      type: GETLOGINSUCCESS,
      payload: user,
    };
  };
  
  const getloginFailure = (error) => ({
    type: GETLOGINFAILURE,
    payload: error,
  });
  
  const getOtherUserFailure = (error) => ({
    type: GETUSERFAILURE,
    payload: error,
  });

export const getUserDetails = (userToken,userId,onSuccess) => (dispatch) => {
  let user;
  dispatch(getUserStart());

  let headers ={};
  if (userToken) {
    headers = {
      'x-access-token': `${userToken}`
    };
  }

  axios
    .get(`${localBackendUrl}/users/${userId}`, {headers})
    .then((response) => {
      user = response.data;
      dispatch(getUserProfile(user));
      onSuccess();  // Call the success callback here
    })
    .catch((err) => {
      dispatch(getloginFailure(err.response?.data?.error));
    });
};

export const getOtherUserDetails = (userToken) => (dispatch) => {
  let users;
  dispatch(getOtherUserStart());

  let headers ={};
  if (userToken) {
    headers = {
      'x-access-token': `${userToken}`
    };
  }

  axios
    .get(`${localBackendUrl}/users`, {headers})
    .then((response) => {
      users = response.data;
      dispatch(getOtherUsersProfile(users));
    })
    .catch((err) => {
      dispatch(getOtherUserFailure(err.response?.data?.error));
    });
};

export const getUserFunc = async (userToken, userId) => {
  try {
    let user;

    let headers = {};
    if (userToken) {
      headers = {
        'x-access-token': `${userToken}`
      };
    }
    const response = await axios.get(`${localBackendUrl}/users/${userId}`, { headers });
    user = response.data;
    return user;
  } catch (err) {
    throw err; // Re-throw the error to propagate it up
  }
};


export const logout = () => {
localStorage.removeItem("user");
 return  {
  type: LOGOUT,
}};



export const login = (username, password, setUsername, setPassword, navigate) => (dispatch) => {
  dispatch(getloginStart());
  axios
    .post(`${localBackendUrl}/signin`, { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(getloginSuccess(response.data));
      const user = {
        token: response.data.accessToken,
        userId: response.data.id,
        uuid: response.data.uuid
      };
      dispatch(getUserDetails(user.token,user.uuid, () => navigate()));  // Pass navigate as the onSuccess callback
      localStorage.setItem('user', JSON.stringify(user));
      setUsername('');
      setPassword('');
    })
    .catch((err) => {
      dispatch(getloginFailure(err.response?.data?.error));
    });
};


export default login;
