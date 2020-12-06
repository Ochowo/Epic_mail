import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { messageSelector, getMessage, openModal } from './messageSlice';
import Navbar from '../../components/navbar/navbar';
import DataTable from '../../components/dataTable/dataTable';
import ComposeMessage from './composeMessage';
import './message.scss';
import { authSelector } from '../auth/authSlice';

const Messages = ({ folder }) => {
  const dispatch = useDispatch();
  const {
    isLoading, inbox, data, error, hasErrors, initSend, open, close, messages,

  } = useSelector(messageSelector);
  console.log(error != null ? initSend : 'pppp');
  const { user } = useSelector(authSelector);
  async function showModal() {
    dispatch(openModal());
  }

  const fetchMessages = () => {
    const url = folder == null ? '/messages' : `/messages/folder?name=${folder}`;
    dispatch(getMessage(url));
  };
  useEffect(() => {
    fetchMessages(folder);
  }, [dispatch]);
  console.log(data, user);
  return (

    <>
      <Navbar />
      <section className="top-sec2">
        <ComposeMessage folder="sent" hasErrors={hasErrors} initSend={initSend} />
        <div className="container-table" id="rott">
          <div className="lef-bo">
            <ul className="em-bnn" id="myTopnav">
              <li>
                <button
                  className="create cree cs"
                  id="create"
                  type="button"
                  onClick={showModal}
                >
                  Compose
                </button>
              </li>
              <li className="msg-li">
                <Link to="/inbox">Inbox</Link>
              </li>
              <li className="msg-li">
                <Link to="/sent" className="seent">Sent</Link>
              </li>
              <li className="msg-li">
                <Link to="/unread" className="unr">Unread</Link>
              </li>
              <li className="msg-li">
                <Link to="/draft" className="drf">Draft</Link>
              </li>
              <li className="msg-li">
                <Link to="/trash" className="trs">Trash</Link>
              </li>
            </ul>
          </div>
          <div className="righ-bo baz">
            {' '}
            <DataTable
              data={data}
              isLoading={isLoading}
              folder={folder}
            />
          </div>
        </div>
      </section>
    </>
  );
};

Messages.propTypes = {
  folder: PropTypes.string,
};
export default Messages;
