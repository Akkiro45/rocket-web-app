import { AUTH_SUCCESS, SIGNOUT, SET_DONE } from '../actions/actionTypes';

const initState = {
  token: null,
  data: null,
  done: false
};

const reducer = (state=initState, action) => {
  switch(action.type) {
    case AUTH_SUCCESS: return {...state, ...action.data};
    case SIGNOUT: return {...state, token: null, data: null };
    case SET_DONE: return { ...state, done: action.done };
    default: return state;
  }
}

export default reducer;