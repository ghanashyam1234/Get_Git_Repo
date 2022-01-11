import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SET_LOADING,
  CLEAR_REPOS,
  SEARCH_REPOS,
} from '../types';


const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchRepos = async ({q, page, per_page, sort, order}) => {
    setLoading();
    const res = await axios.get(
      `http://localhost:5000/search/repos?q=${q}&page=${page}&per_page=${per_page}&sort=${sort}&order=${order}`
    );
    dispatch({
      type: SEARCH_REPOS,
      payload: res.data.data.items,
    });
  };

  const clearRepos = () => dispatch({ type: CLEAR_REPOS });

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: SET_LOADING,
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchRepos,
        setLoading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
