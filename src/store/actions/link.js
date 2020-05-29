import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../axios';
import { SET_LINKS, ADD_LINK, SET_CURR, SET_HIDE } from './actionTypes';
import { startLoading, stopLoading, resetError, errorExtractor } from './index';

export const addLink = (link) => {
  return {
    type: ADD_LINK,
    link
  }
}

export const setLinks = (links) => {
  return {
    type: SET_LINKS,
    links
  }
}

export const setCurr = (id) => {
  return {
    type: SET_CURR,
    id
  }
}

export const setHide = (hide) => {
  return {
    type: SET_HIDE,
    hide
  }
}

export const onAddLink = (token, data, done) => {
  return async dispatch => {
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.post('/link/add', data, { headers });
      if(response) {
        if(response.data.status === 'ok') {
          dispatch(addLink(response.data.data));
          let links = localStorage.getItem('links');
          links = JSON.parse(links);
          if(!links) {
            links = [];
          }
          links.unshift(response.data.data);
          localStorage.setItem('links', JSON.stringify(links));
          dispatch(stopLoading());
          done();
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const onRemoveLink = (token, id, links) => {
  return async dispatch => {
    dispatch(setCurr(id));
    dispatch(resetError());
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.delete(`/link/remove/${id}`, { headers });
      if(response) {
        if(response.data.status === 'ok') {
          links = links.filter(link => link._id !== id);
          dispatch(stopLoading());
          dispatch(setLinks(links));
          localStorage.setItem('links', JSON.stringify(links));
          toast.success('Link removed!', {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      dispatch(stopLoading());
      if(error.response) {
        if(error.response.data.status === 'error') {
          toast.error(error.response.data.error.msg, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      } else {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }
}

export const fetchLinks = (token, history) => {
  return async dispatch => {
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.get('/link/?pageNumber=1&pageSize=-1', { headers });
      if(response) {
        if(response.data.status === 'ok') {
          dispatch(setLinks(response.data.data));
          localStorage.setItem('links', JSON.stringify(response.data.data));
          dispatch(stopLoading());
          if(history) {
            history.replace('/');
          }
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const editLink = (token, id, type, value, links) => {
  return async (dispatch) => {
    dispatch(setCurr(id));
    dispatch(resetError());
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    const data = {
      id,
      type,
      value
    }
    try {
      const response = await axios.patch(`/link/edit`, data, { headers });
      if(response.data.status === 'ok') {
        const linkIndex = links.findIndex(link => link._id === id);
        if(linkIndex !== -1) {
          links[linkIndex][type] = value;
        }
        dispatch(setLinks(links));
        localStorage.setItem('links', JSON.stringify(links));
        dispatch(stopLoading());
        dispatch(setCurr(null));
      } else {
        throw new Error('Error!');
      }
    } catch(error) {
      dispatch(stopLoading());
      if(error.response) {
        if(error.response.data.status === 'error') {
          toast.error(error.response.data.error.msg, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      } else {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }
}