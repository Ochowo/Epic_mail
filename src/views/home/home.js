import React, { Fragment } from 'react';
import Navbar from '../../components/navbar/navBar';
import Landing from '../../components/landing/landing';
import Footer from '../../components/footer/footer';


const Home = () => (
  <Fragment>
    <Navbar />
    <Landing />
    <Footer />
  </Fragment>
);

export default Home;
