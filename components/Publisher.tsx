import React, { useCallback, useState, FC } from 'react';
import { Group, Message } from './data/types';
import { sendMessage } from './data/api/messages';
import { TextField, Avatar, Grid, Hidden, Fab, Card } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export interface PublisherProps {
  groupId: Group['id'];
  avatarUrl: string;
  onSuccess(message: Message): void;
}

const Publisher: FC<PublisherProps> = ({ groupId, avatarUrl, onSuccess }) => {
  const [body, setBody] = useState('');
  const updateBody = useCallback((event: any) => {
    const text = event.target.value;
    setBody(text);
  }, []);
  const postMessage = useCallback(async () => {
    const newMessage = await sendMessage(groupId, body);
    setBody('');
    onSuccess(newMessage);
  }, [groupId, body, onSuccess]);

  return (
    <Card
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '2%',
        right: '2%',
        height: '60px',
      }}
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: '60px' }}
      >
        <Hidden xsDown>
          <Grid item sm={1}>
            <Avatar
              src={avatarUrl}
              style={{ margin: 'auto', height: '44px', width: '44px' }}
            />
          </Grid>
        </Hidden>
        <Grid
          item
          xs={10}
          sm={9}
          style={{ paddingRight: '20px', paddingLeft: '20px' }}
        >
          <TextField fullWidth value={body} onChange={updateBody} />
        </Grid>
        <Grid item xs={2}>
          <Fab color="primary" size="small" onClick={postMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Publisher;
