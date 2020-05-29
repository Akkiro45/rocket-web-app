import axios from '../../axios';
import { AUTH_SUCCESS, SIGNOUT, SET_DONE } from './actionTypes';
import { startLoading, resetError, stopLoading, setError, setHide, setLinks, errorExtractor } from './index';

export const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    data
  }
}

export const signout = () => {
  return {
    type: SIGNOUT,
  }
}

export const setDone = (done) => {
  return {
    type: SET_DONE,
    done
  }
}

export const onSignout = (token) => {
  return dispatch => {
    const headers = {
      'x-auth': token
    }
    axios.delete('/user/signout', { headers })
      .then(() => {
        resset(dispatch);
      })
      .catch(() => {
        resset(dispatch);
      });
  }
}

const resset = (dispatch) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('theme');
  localStorage.removeItem('links');
  dispatch(setLinks([]));
  dispatch(signout());
  dispatch(resetError());
}

export const auth = (data, isSignin, history) => {
  return dispatch => {
    dispatch(startLoading());
    const URL = isSignin ? '/user/signin' : '/user/signup';
    axios.post(URL, data)
      .then(res => {
        const data = {
          token: res.headers['x-auth'],
          data: res.data.data
        }
        dispatch(authSuccess(data));
        dispatch(stopLoading());
        localStorage.setItem('auth', JSON.stringify(data));
        history.replace('/');
      })
      .catch(error => {
        errorExtractor(dispatch, error);
      });
  }
}

export const autoSignin = () => {
  return dispatch => {
    let auth = localStorage.getItem('auth')
    if(auth) {
      auth = JSON.parse(auth);
      if(auth.data && auth.token) {
        dispatch(authSuccess(auth));
      } else {
        dispatch(signout());
      }
    } else {
      dispatch(signout());
    }
  }
}

export const getResetPwdToken = (data) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.post('/resetpassword', data);
      if(response.data.status === 'ok') {
        localStorage.setItem('userId', response.data.data.userId);
        dispatch(setDone(true));
        dispatch(stopLoading());
      } else {
        throw new Error('Error!');
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const validateResetPwdToken = (token) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.post(`/resetpassword//check/${token}`);
      if(response.data.status === 'ok') {
        dispatch(stopLoading());
      } else {
        throw new Error('Error!');
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const resetPwd = (data) => {
  return async (dispatch) => {
    try {
      data.userId = localStorage.getItem('userId');
      dispatch(startLoading());
      const response = await axios.patch('/resetpassword/reset', data);
      if(response.data.status === 'ok') {
        localStorage.removeItem('userId');
        dispatch(setDone(true));
        dispatch(stopLoading());
      } else {
        throw new Error('Error!');
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const checkPassword = (password, token) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const data = {
      password
    }
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.post('/user/check/password', data, { headers });
      if(response.data.status === 'ok') {
        dispatch(setHide(false));
        dispatch(stopLoading());
      } else {
        dispatch(stopLoading());
        dispatch(setError('Invalid password!'));
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }  
}