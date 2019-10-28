import React from 'react';
import { shallow } from 'enzyme';
import { InboxMsg } from '../../components/InboxMessages/inboxMessages';

const props = {
  isAuthenticated: true,
  isLoading: false,
  auth: { isAuthenticated: true },
  messages: {
    message: { inbox: [
      {
        createdon: '2019-10-25T17:12:28.523Z',
        email: 'haruna@gmail.com',
        message: 'mmmm',
        messageid: 99,
        parentmessageid: null,
        receiverid: 16,
        ruserlastname: 'haruna',
        rusername: 'ochowo',
        senderid: 16,
        sfirstname: 'ochowo',
        slastname: 'haruna',
        status: 'unread',
        subject: 'nnn',
      },
    ] },

  },
  errors: null,
  getAllInbox: () => {},
};

describe('InboxMsg message component', () => {
  it('should render without errors', () => {
    const component = shallow(<InboxMsg {...props} />);
    expect(component).toMatchSnapshot();
  });
});
