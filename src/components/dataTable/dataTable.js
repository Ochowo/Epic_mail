import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getMessage } from '../../features/messages/messageSlice';

const DataTable = ({ data, isLoading, name, folder }) => {
  console.log(data, '<><><> dara');
  const [hover, setHover] = useState(false);
  const [singleMsg, setSingleMsg] = useState(false);
  const dispatch = useDispatch();
  const fetchAMessage = (id) => {
    setSingleMsg(true);
    const url = `/messages/${id}`;
    dispatch(getMessage(url));
  };
  return (
    <div className="wrapper-scroll">
      <table className="table tblll" id="tbl">
        <colgroup>
          <col span="1" className="le-wi" />
          <col span="1" className="mi-wi" />
          <col span="1" className="ri-wi" />
          <col span="1" className="le-wi" />
        </colgroup>
        <thead>
          <tr>
            <th>
              {data === null ? null : <input type="checkbox" name="check" value="check" className="check" />}
            </th>
          </tr>
          <tr><td> </td></tr>
          <tr><td> </td></tr>
        </thead>
        <tbody>
          {isLoading && <tr className="spinner" />}
          {isLoading === false ? data === null ? (
            <tr className="tr-height">
              <td className="err-rw">
                No &nbsp;
                {folder}
                {' '}
                Messages
              </td>
            </tr>
          ) : singleMsg ? <td>j</td>
            : data && data.map((msg) => {
              const title = msg.Content.subject;
              const mainMsg = msg.Content.body;
              const { receiverEmail } = msg.Content;
              console.log(msg.Content, receiverEmail);
              const msgString = `${title} ${mainMsg}`;
              const spliceString = msgString.slice(0, 75);
              const titleString = title.slice(0, 75);
              const mainStr = spliceString.replace(titleString, '');
              return (
                <tr key={msg.id} id="rem" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => fetchAMessage(msg.id)}>
                  <td>
                    <input type="checkbox" name="check" value="select" className="check" />
                  </td>
                  <td>
                    <span id="spe">{receiverEmail}</span>
                  </td>
                  <td className="ellip">
                    {title.length > 0 ? <span className={msg.isread === true ? 'subject' : 'unread'}>{ titleString }</span> : <span className={msg.isread === true ? 'subject' : 'unread'}>(no subject)</span>}

                    {mainMsg.length > 0 ? (
                      <span>
&nbsp; - &nbsp;
                        {mainStr}
                        ...
                      </span>
                    ) : null}

                  </td>
                  {/* {hover ? (
                    <td>
                      <FontAwesomeIcon icon={faTrashAlt} className="fa fa-trash-o del" />
                    </td>

                  ) : null} */}
                  {/* <td>{msg.createdon}</td> */}
                </tr>
              );
            })
            : <tr className="spinner" />}
        </tbody>
      </table>
    </div>

  );
};
DataTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  folder: PropTypes.string,
};
export default DataTable;
