/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postMessages } from '../../actions/messageAction';
import Logo from '../../components/logo/logo';
import InputField from '../../components/input/input';

class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverEmail: '',
      subject: '',
      message: '',
    };
  }

  onChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { messageAction, history } = this.props;
    const { receiverEmail, subject, message } = this.state;
    const data = {
      receiverEmail,
      subject,
      message,
    };
    messageAction(data, history);
  }

  render() {
    const { message } = this.props;
    const { error } = message;
    const { loading, sent, closed } = this.props;
    let displayError;
    if (error) {
      displayError = error.error;
    }
    return (
      <Fragment>
        <div className="center-boxxx" id="mmoo">
          <form className="box boxx" id="box25" onSubmit={e => this.onSubmit(e)}>
            <span className="closed" onClick={closed} role="presentation">
              &times;
            </span>
            <div className="logo-box">
              <Logo />
            </div>
            <h2 className="boxx-textt">Compose Message</h2>
            <InputField
              className="input name1 textt newt"
              id="email3"
              type="text"
              name="receiverEmail"
              placeholder="To"
              onChange={e => this.onChange(e)}
            />
            <br />
            {displayError && <div className="feedback">{displayError.receiverEmail}</div>}
            <InputField
              className="input name1 textt newt"
              id="subject"
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={e => this.onChange(e)}
            />
            <br />
            {displayError && <div className="feedback">{displayError.subject}</div>}
            <textarea
              rows="15"
              cols="30"
              className="teexs"
              id="message"
              placeholder="Enter message"
              name="message"
              onChange={e => this.onChange(e)}
            />
            {displayError && <div className="feedback">{displayError.message}</div>}
            <button className="create cree2 yh" id="newMessage" type="submit">
              {loading ? 'Loading...' : sent ? 'Message sent' : 'Send'}
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}
ComposeMessage.propTypes = {
  messageAction: PropTypes.func.isRequired,
  message: PropTypes.shape({
    root: PropTypes.string,
    sent: PropTypes.bool,
    loading: PropTypes.bool,
  }),
};

const mapStateToProps = state => ({
  message: state.message,
  loading: state.message.isLoading,
  sent: state.message.isSent,
  close: state.message.closeModal,
});

const mapDispatchToProps = {
  messageAction: postMessages,
};
const Compose = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ComposeMessage));
export default Compose;
export { ComposeMessage };
