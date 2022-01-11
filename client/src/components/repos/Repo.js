import React, { Fragment, useEffect, useContext, useState } from 'react';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const Repo = () => {
  const githubContext = useContext(GithubContext);
  const { loading, repos } = githubContext;

  const { repoid } = useParams();
  
  const [repo, setRepo] = useState({});

  useEffect(() => {
    filterRepo(repoid);
  }, []);

  const filterRepo = (repoid) => {
      let filtered = repos.filter(r => r.id == repoid);
      if (filtered.length > 0) setRepo({...repo, ...filtered[0]});
  }

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      <div className='card grid-2'>
        <div className='all-center'>
          {/* <img
            src={repo.owner.avatar_url}
            className='round-image'
            alt=''
            style={{ width: '150px' }}
          /> */}
          <h1>{repo.owner.name}</h1>
        </div>
        <div>
          <a href={repo.owner.html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {repo.owner.login && (
                <Fragment>
                  <strong>Username: </strong> {repo.owner.login}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <h3>Repo Name: {repo.name}</h3>
        <h5>Owner Name: {repo.owner.login}</h5>
        <h5>Open issues count:  {repo.open_issues_count}</h5>
        <h5>Default branch: {repo.default_branch}</h5>
        <h5>Repo URL: <a href={repo.url} >
            Visit Github 
          </a></h5>
      </div>
    </Fragment>
  );
};


export default Repo;
