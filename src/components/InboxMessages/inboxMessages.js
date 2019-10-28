import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchMessages } from '../../actions/messageAction';

class InboxMsg extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      const { getAllInbox } = this.props;
      getAllInbox();
    }
  }

  render() {
    const { messages, isLoading } = this.props;
    const { inbox } = messages.message;
    console.log(this.props)
    return (
      <div className="wrapper-scroll">
        <table className="table" id="tbl">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="check" value="check" className="check" />
              </th>
              <th>Id</th>
              <th />
              <th>Message</th>
              <th>
                <FontAwesomeIcon icon={faTrashAlt} className="fa fa-trash-o del" />
                &nbsp;&nbsp;&nbsp; Delete
              </th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr className="spinner" />}
            {inbox
              && inbox.map(msg => (
                <tr key={msg.messageid} className="unread" id="rem">
                  <td>
                    <input type="checkbox" name="check" value="select" className="check" />
                  </td>
                  <td>
                    <span id="spe">{msg.messageid}</span>
                  </td>
                  <td>
                    {msg.sfirstname}
                      &nbsp;&nbsp;&nbsp;
                    {msg.slastname}
                  </td>
                  <td className="ellip">
                    <div className="subject">{msg.subject}</div>
                    {msg.message}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faTrashAlt} className="fa fa-trash-o del" />
                  </td>
                  <td>{msg.createdon}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
InboxMsg.propTypes = {
  getAllInbox: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.any,
  isLoading: PropTypes.bool,
  auth: PropTypes.shape({ root: PropTypes.string, isAuthenticated: PropTypes.bool }),
};
const mapStateToProps = state => ({
  messages: state.message,
  isLoading: state.message.isLoading,
  auth: state.auth,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllInbox: fetchMessages,
  },
  dispatch,
);
export { InboxMsg };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(InboxMsg));
