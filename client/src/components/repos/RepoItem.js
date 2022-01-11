import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RepoItem = ({ repo }) => {
  return (
    <div className='card'>
      <h3>
        <h4>{repo.name}</h4>
        <div>
        <Link to={`/repo/${repo.id}`}>
        Details
        </Link>
        </div>
      </h3>
    </div>
  );
};

RepoItem.propType = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
