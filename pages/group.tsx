import React, { useState, FC, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Meta from '../components/Meta';
import { Group, User } from '../components/data/types';
import Message from '../components/Message';
import Grid from '@material-ui/core/Grid';
import { getGroup } from '../components/data/api/getGroup';

export interface GroupProps {
  id: string;
}

const GroupPage: FC<GroupProps> = ({ id = '9817284' }) => {
  const [group, setGroup] = useState<Group>();

  const fetchGroup = async (id: string) => {
    const group = await getGroup(id);
    setGroup(group);
  };

  useEffect(() => {
    fetchGroup(id);
  }, [id]);

  if (!group) {
    return <div>Loading</div>;
  }

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
      <Meta pageTitle={group.name} />
      <div>{group.name}</div>
      <div>{group.description}</div>
      <Grid container spacing={2}>
        {messagesGridItems}
      </Grid>
    </>
  );
};

export default GroupPage;
