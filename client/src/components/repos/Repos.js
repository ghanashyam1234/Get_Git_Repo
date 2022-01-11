import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Repos = () => {

  const githubContext = useContext(GithubContext);
  const { loading, repos } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={repoStyle}>
        {repos?.map((repo) => (<RepoItem repo={repo} key={repo.id} />))}
      </div>
    );
  }
};

const repoStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};


export default Repos;
