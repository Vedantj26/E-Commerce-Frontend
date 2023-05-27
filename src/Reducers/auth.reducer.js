import { AUTH } from "../Actions/action.type";

const userData = localStorage.getItem("userInfo");
const userToken = localStorage.getItem("token");


let userInfo = null;
if(userData){
  userInfo = JSON.parse(userData);
}

let token = null;
if(userToken){
  token = userToken;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  filePath: "",
  token: token,
  userInfo: userInfo,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH.UPDATE_FIRSTNAME:
      return { ...state, firstName: payload };

    case AUTH.UPDATE_LASTNAME:
      return { ...state, lastName: payload };

    case AUTH.UPDATE_EMAIL:
      return { ...state, email: payload };

    case AUTH.UPDATE_PASSWORD:
      return { ...state, password: payload };

    case AUTH.UPDATE_FILEPATH:
      return { ...state, filePath: payload };

      case AUTH.UPDATE_USER_TOKEN:
      return { ...state, token: payload };

    case AUTH.UPDATE_USER_INFO:
      return { ...state, userInfo: payload };

    default:
      return state;
  }
};

export default authReducer;
