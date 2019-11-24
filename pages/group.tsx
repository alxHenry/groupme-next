import React, { useState, FC, useEffect } from 'react';
import Meta from '../components/Meta';
import { Group, Message as MessageData } from '../components/data/types';
import Message from '../components/Message';
import { Box, Grid } from '@material-ui/core';
import { getGroups } from '../components/data/api/getGroups';
import { getMessages } from '../components/data/api/getMessages';
import GroupNav from '../components/GroupNav';
import { useRouter } from 'next/router';

const GroupPage: FC = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const groupId = router.query.id as string | undefined;

  const fetchGroupsAndMessages = async (groupId?: Group['id']) => {
    const fetchedGroups = await getGroups();
    const groupIdToFetchMessagesFrom = groupId || fetchedGroups[0].id;
    const fetchedMessages = await getMessages(groupIdToFetchMessagesFrom);

    setGroups(fetchedGroups);
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    fetchGroupsAndMessages(groupId);
  }, [groupId]);

  if (!groups.length) {
    return <div>Loading</div>;
  }

  const group = groups.find(item => item.id === groupId) || groups[0];

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
      <Meta pageTitle={group.name} />
      <GroupNav groups={groups} />
      <Box fontSize={18} fontWeight={600}>
        {group.name}
      </Box>
      <Box fontSize={12} color="#999999">
        {group.description}
      </Box>
      <Grid container spacing={2}>
        {messagesGridItems}
      </Grid>
    </>
  );
};

export default GroupPage;
