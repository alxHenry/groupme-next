import React, { useState, FC, useEffect, useCallback } from 'react';
import Meta from '../components/Meta';
import { Group, Message as MessageData } from '../components/data/types';
import { Box, Grid, Hidden, Paper, Divider } from '@material-ui/core';
import { getGroups } from '../components/data/api/getGroups';
import { getMessages } from '../components/data/api/messages';
import GroupNav from '../components/GroupNav';
import { useRouter } from 'next/router';
import { collapseMessagesBySender } from '../components/data/helpers/message';
import MessageGroup from '../components/MessageGroup';
import Publisher from '../components/Publisher';

const GroupPage: FC = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const groupId = router.query.id as string | undefined;
  const appendNewMessage = useCallback((message: MessageData) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

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
  const collapsedMessages = collapseMessagesBySender(messages);

  const messagesItems = collapsedMessages.map((messageGroup, index) => (
    <MessageGroup key={index} messages={messageGroup} />
  ));

  return (
    <>
      <Meta pageTitle={group.name} />
      <Grid
        container
        style={{
          position: 'fixed',
          top: 0,
          bottom: '100px',
          overflowY: 'scroll',
        }}
      >
        <Hidden xsDown>
          <Grid item sm={1}>
            <GroupNav groups={groups} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={10}>
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
            {messagesItems}
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} />
        </Hidden>
        {/* TODO: Fetch my user and store */}
        <Publisher
          groupId={group.id}
          avatarUrl="https://i.groupme.com/935x500.jpeg.32e98a9f2f2842f6bb3b302fbef4391e.avatar"
          onSuccess={appendNewMessage}
        />
      </Grid>
    </>
  );
};

export default GroupPage;
