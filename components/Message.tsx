import React, { FC } from 'react';
import { User } from './data/types';
import { Avatar, Grid, Paper } from '@material-ui/core';

export interface MessageProps {
  name: string;
  avatarUrl: string;
  messageBody: string;
}

const Message: FC<MessageProps> = ({ name, avatarUrl, messageBody }) => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={1}>
          <Avatar src={avatarUrl} alt={name} />
        </Grid>
        <Grid item xs={10}>
          {name}
        </Grid>
        <Grid item xs={12}>
          {messageBody}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Message;
