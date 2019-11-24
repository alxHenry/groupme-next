import React, { FC } from 'react';
import { Avatar, Box, Grid } from '@material-ui/core';

export interface MessageProps {
  name: string;
  avatarUrl: string;
  messageBody: string;
}

const Message: FC<MessageProps> = ({ name, avatarUrl, messageBody }) => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <Avatar src={avatarUrl} alt={name} />
      </Grid>
      <Grid item xs={11}>
        <Box fontWeight={600}>{name}</Box>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={11}>
        {messageBody}
      </Grid>
    </Grid>
  );
};

export default Message;
