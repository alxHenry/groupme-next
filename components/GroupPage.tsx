import React, { useState, FC, useEffect, useCallback } from 'react';
import Meta from '../components/Meta';
import { GroupModel } from '../components/data/types';
import { Box, Grid, Hidden, Paper, Divider } from '@material-ui/core';
import { collapseMessagesBySender } from '../components/data/helpers/message';
import MessageGroup from '../components/MessageGroup';
import Publisher from '../components/Publisher';
import { useStore } from './data/types/store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import useInitialDataLoad from '../hooks/useInitialDataLoad';
import GroupNav from './GroupNav';

const GroupPage: FC = observer(() => {
  const router = useRouter();
  const routeGroupId = router.query.id as string | undefined;

  const { groups } = useStore();

  useInitialDataLoad(routeGroupId);

  if (!groups.size) {
    return <div>Loading</div>;
  }

  let group: GroupModel | undefined;
  if (routeGroupId) {
    group = groups.get(routeGroupId);
  } else {
    group = groups.values().next().value as GroupModel;
  }

  if (!group) {
    throw new Error('Group is not in the store');
  }

  const collapsedMessages = collapseMessagesBySender(group.messages);
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
            <GroupNav />
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
        />
      </Grid>
    </>
  );
});

export default GroupPage;
