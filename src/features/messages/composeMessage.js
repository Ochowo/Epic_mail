import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { postMessage, messageSelector, closeModal } from './messageSlice';
import Logo from '../../components/logo/logo';
import Input from '../../components/input/input';
import './message.scss';

const ComposeMessage = ({ folder }) => {
  const msgData = {
    subject: '',
    body: '',
    replyId: null,
    parentId: null,
    groupId: null,
    receiverEmail: '',
    attatchments: null,
  };

  const [composeMsgState, setComposeMsgState] = useState(msgData);
  const dispatch = useDispatch();
  const { isLoading, sent, errors, close } = useSelector(messageSelector);
  async function sendMsg(e) {
    e.preventDefault();
    await dispatch(postMessage(folder, composeMsgState));
  }
  async function closePopUp() {
    dispatch(closeModal());
  }
  function handleComposeStateChange(event) {
    const { name, value } = event.target;

    setComposeMsgState({ ...composeMsgState, [name]: event.target.name === 'receiverEmail' ? [value] : value });
  }
  function handleTextArea() {
    const x = document.getElementById('myTextarea').value;
    msgData.body = x;
    setComposeMsgState({ ...composeMsgState, body: x });
    
  }console.log(composeMsgState, 'opop')
  const formDisplay = (
    <>
      <span className="closed" onClick={closePopUp} role="presentation">
        &times;
      </span>
      <div className="logo-box">
        <Logo />
      </div>
      <h2 className="boxx-textt">Compose Message</h2>
      <Input
        className="input name1 textt newt"
        id="email3"
        type="text"
        name="receiverEmail"
        placeholder="To"
        value={composeMsgState.receiverEmail}
        onChange={handleComposeStateChange}
      />
      <br />
      {errors && <div className="feedback">{errors.receiverEmail}</div>}
      <Input
        className="input name1 textt newt"
        id="subject"
        type="text"
        placeholder="Subject"
        name="subject"
        value={composeMsgState.subject}
        onChange={handleComposeStateChange}
      />
      <br />

      <textarea
        rows="15"
        cols="30"
        className="teexs txt-se"
        id="myTextarea"
        placeholder="Enter message"
        name="body"
        // value={composeMsgState.body}
        onChange={handleTextArea}
      />
      <button className="create cree2 yh" id="newMessage" type="submit" onClick={sendMsg}>
        {isLoading ? 'Loading...' : 'Send'}
      </button>
    </>
  );
  const sentDisplay = (
    <>
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      <p className="success">Message Sent</p>
    </>
  );
  return (
    close ? null
      : (
        <div className="overlay">
          <div className="center-boxxx" id="mmoo">
            <form className="box boxx">

              {sent ? sentDisplay : formDisplay}
            </form>

          </div>
        </div>
      )
  );
};
ComposeMessage.propTypes = {
  folder: PropTypes.string,
};

export default ComposeMessage;
