import React, { useState, FC, useEffect } from 'react';
import Meta from '../components/Meta';
import { Group, Message as MessageData } from '../components/data/types';
import Message from '../components/Message';
import { Box, Grid, Paper, Divider } from '@material-ui/core';
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
      <Grid container>
        <Grid item xs={1}>
          <GroupNav groups={groups} />
        </Grid>
        <Grid item xs={11}>
          <Paper
            style={{
              paddingTop: '12px',
              paddingRight: '24px',
              paddingBottom: '12px',
              paddingLeft: '24px',
            }}
          >
            <Box fontSize={18} fontWeight={600}>
              {group.name}
            </Box>
            <Box fontSize={12} color="#999999" style={{ marginBottom: '8px' }}>
              {group.description}
            </Box>
            <Divider style={{ marginBottom: '20px' }} />
            <Grid container spacing={3}>
              {messagesGridItems}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default GroupPage;