import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { users, clearUsers, searchUsers, searchRepos } = githubContext;
  const { setAlert } = alertContext;

  const [state, setState] = useState({
    q: '',
    page: '1',
    per_page: '10',
    sort: 'stars',
    order: 'desc'
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.q === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchRepos(state);
      setState({...state, q: ''});
    }
  };

  const onChange = (e) => {
    setState({...state, [e.target.name]: e.target.value});
    console.log(state);
  };

  const incrementPageCount = (e) => {
    e.preventDefault();
    setState({
      ...state,
      page: parseInt(state.page) + 1
    });
    // call search
  }

  const decrementPageCount = (e) => {
    e.preventDefault();
    setState({
      ...state,
      page: (parseInt(state.page) > 1) ? parseInt(state.page) - 1 : parseInt(state.page)
    });
    // call search
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
      <input
          type='text'
          name='q'
          placeholder='Search Repos...'
          value={state.q}
          onChange={onChange}
        />

        <label htmlFor="per_page">Items per page:</label>
        <select name="per_page" id="per_page" defaultValue={state.per_page} onChange={onChange}>
          <option value="10" >10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <label htmlFor="sort">Sort by:</label>
        <select name="sort" id="sort" defaultValue={state.sort} onChange={onChange}>
          <option value="stars" >Stars</option>
          <option value="name" >Name</option>
          <option value="full_name" >Full Name</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
        </select>

        <label htmlFor="order">Order by:</label>
        <select name="order" id="order" defaultValue={state.order} onChange={onChange}>
          <option value="desc" >Descending</option>
          <option value="asc" >Ascending</option>
        </select>

        <div className='text-center my-1'>
          <button onClick={decrementPageCount}>&lt;</button> {state.page}<button onClick={incrementPageCount}>&gt;</button>
        </div>

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

export default Search;
