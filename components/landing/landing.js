import React from 'react';
import './landing.scss';
import Auth from '../../features/auth/auth';

const Landing = () => (
  <section className="top-sec">
    <span className="container tsd">
      <span className="pull-left csb">
        <h1 className="pull-text">
          <p className="wel">Welcome!</p>
          <br />
          <p className="every">
            Best in class mail that
            <br />
            connects you to
            <br />
            people round the world.
          </p>
        </h1>
      </span>
      <div className="pull-right csd">
        <Auth />
      </div>
    </span>
  </section>
);
export default Landing;
