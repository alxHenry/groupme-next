import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import Meta from '../components/Meta';
import { User } from '../components/data/types';
import Message from '../components/Message';
import Grid from '@material-ui/core/Grid';

const Group: FC = () => {
  const mockUser: User = {
    name: 'Jacob Roney',
    avatarUrl:
      'https://i.groupme.com/1276x1280.jpeg.49f215feb9204b55a3680fe80cbc8228.avatar',
  };

  const messages = [
    { id: '1', sender: mockUser, messageBody: 'Test message content in body' },
    { id: '2', sender: mockUser, messageBody: 'Test message content in body' },
    { id: '3', sender: mockUser, messageBody: 'Test message content in body' },
  ];

  const messagesGridItems = messages.map(message => (
    <Grid item xs={12} key={message.id}>
      <Message sender={message.sender} messageBody={message.messageBody} />
    </Grid>
  ));

  return (
    <>
      <Meta pageTitle="Group" />
      <Grid container spacing={2}>
        {messagesGridItems}
      </Grid>
    </>
  );
};

export default Group;
