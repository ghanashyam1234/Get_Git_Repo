import React, { Fragment } from 'react';
import Repos from '../repos/Repos';
import Search from '../repos/Search';

const Home = () => (
  <Fragment>
    <Search />
    <Repos />
  </Fragment>
);

export default Home;
