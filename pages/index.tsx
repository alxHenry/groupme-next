import React, { useState, FC, useEffect } from 'react';
import Meta from '../components/Meta';
import { Group, Message as MessageData } from '../components/data/types';
import Message from '../components/Message';
import { Box, Grid } from '@material-ui/core';
import { getGroups } from '../components/data/api/getGroups';
import { getMessages } from '../components/data/api/getMessages';

export interface GroupProps {
  id: string;
}

const GroupPage: FC<GroupProps> = ({ id = '9817284' }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);

  const fetchGroupsAndMessages = async () => {
    const fetchedGroups = await getGroups();
    const fetchedMessages = await getMessages(fetchedGroups[0].id);

    setGroups(fetchedGroups);
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    fetchGroupsAndMessages();
  }, [id]);

  if (!groups.length) {
    return <div>Loading</div>;
  }
  const firstGroup = groups[0];

  const messagesGridItems = messages.map(message => (
    <Grid item xs={12} key={message.id}>
      <Message
        name={message.name}
        avatarUrl={message.avatarUrl}
        messageBody={message.text}
      />
    </Grid>
  ));

  return (
    <>
      <Meta pageTitle={firstGroup.name} />
      <Box fontSize={18} fontWeight={600}>
        {firstGroup.name}
      </Box>
      <Box fontSize={12} color="#999999">
        {firstGroup.description}
      </Box>
      <Grid container spacing={2}>
        {messagesGridItems}
      </Grid>
    </>
  );
};

export default GroupPage;