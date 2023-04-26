import {
  REMOVE_TOKEN,
  SET_TOKEN,
  SET_ROLE,
  SET_PROFILE,
  SET_PROFILE_LOADING,
} from "../constants";

const initialState = {
  token: null,
  profile: null,
  role: "",
  isProfileLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        token: null,
        role: "",
        profile: null,
        isProfileLoading: false,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_PROFILE_LOADING: {
      return {
        ...state,
        isProfileLoading: true,
      };
    }
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isProfileLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
