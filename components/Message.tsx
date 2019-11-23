import React, { FC } from 'react';
import { User } from './data/types';
import { Avatar, Grid, Paper } from '@material-ui/core';

export interface MessageProps {
  sender: User;
  messageBody: string;
}

const Message: FC<MessageProps> = ({ sender, messageBody }) => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={1}>
          <Avatar src={sender.avatarUrl} alt={sender.name} />
        </Grid>
        <Grid item xs={10}>
          {sender.name}
        </Grid>
        <Grid item xs={12}>
          {messageBody}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Message;
