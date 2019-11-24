import React, { useCallback, useState, FC } from 'react';
import { Group, Message } from './data/types';
import { sendMessage } from './data/api/messages';
import { TextField, Avatar, Grid, Button, Card } from '@material-ui/core';

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
        <Grid item xs={1}>
          <Avatar
            src={avatarUrl}
            style={{ margin: 'auto', height: '44px', width: '44px' }}
          />
        </Grid>
        <Grid item xs={10} style={{ paddingRight: '20px' }}>
          <TextField fullWidth value={body} onChange={updateBody} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={postMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Publisher;
