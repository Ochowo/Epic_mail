/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import Navbar from '../../components/navbar/navBar';
import Compose from '../composeMessage/composeMessage';
import InboxMsg from '../../components/InboxMessages/inboxMessages';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'false',
    };
    this.openModalHandler = this.openModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
  }

  openModalHandler() {
    this.setState({
      show: true,
    });
  }

  closeModalHandler() {
    this.setState({
      show: false,
    });
  }

  render() {
    if (this.state.show === true) {
      return (
        <Fragment>
          <Navbar />
          <section className="top-sec2">
            <div className="container2 tainn" id="rott">
              <div className="lef-bo shok">
                <ul className="em-bnn" id="myTopnav">
                  <li>
                    <button
                      className="create cree cs"
                      id="create"
                      type="button"
                      onClick={this.openModalHandler}
                    >
                      Compose
                    </button>
                  </li>
                  <li>
                    <a href="https://epic-mail04.herokuapp.com/user.html">Inbox</a>
                  </li>
                  <li>
                    <span className="seent">Sent</span>
                  </li>
                  <li>
                    <span className="unr">Unread</span>
                  </li>
                  <li>
                    <h4 className="grp"> My Groups</h4>
                  </li>
                  <li>
                    <div id="table" />
                  </li>
                  <li>
                    <span className="cr-grppp">
                      <a href="https://epic-mail04.herokuapp.com">
                        <span className="plus">+</span>
                        <span className="crrr">Create group</span>
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="righ-bo baz">
                {' '}
                <Compose closed={this.closeModalHandler} />
              </div>
            </div>
          </section>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Navbar />
        <section className="top-sec2">
          <div className="container2 tainn" id="rott">
            <div className="lef-bo shok">
              <ul className="em-bnn" id="myTopnav">
                <li>
                  <button
                    className="create cree cs"
                    id="create"
                    type="button"
                    onClick={this.openModalHandler}
                  >
                    Compose
                  </button>
                </li>
                <li>
                  <a href="https://epic-mail04.herokuapp.com/user.html">Inbox</a>
                </li>
                <li>
                  <span className="seent">Sent</span>
                </li>
                <li>
                  <span className="unr">Unread</span>
                </li>
                <li>
                  <h4 className="grp"> My Groups</h4>
                </li>
                <li>
                  <div id="table" />
                </li>
                <li>
                  <span className="cr-grppp">
                    <a href="nhttps://epic-mail04.herokuapp.com/ew.html">
                      <span className="plus">+</span>
                      <span className="crrr">Create group</span>
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="righ-bo baz">
              <InboxMsg />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
export default Inbox;
