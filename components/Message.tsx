import React, { FC } from 'react';
import { Avatar, Box, Grid, Hidden } from '@material-ui/core';

export interface MessageProps {
  name: string;
  avatarUrl: string;
  messageBody: string;
  withHeader?: boolean;
}

const Message: FC<MessageProps> = ({
  name,
  avatarUrl,
  messageBody,
  withHeader = true,
}) => {
  const header = withHeader ? (
    <>
      <Hidden xsDown>
        <Grid item sm={1}>
          <Avatar src={avatarUrl} alt={name} />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={11}>
        <Box fontWeight={600}>{name}</Box>
      </Grid>
    </>
  ) : null;

  return (
    <Grid container alignItems="center">
      {header}
      <Grid item xs={1} />
      <Grid item xs={11}>
        {messageBody}
      </Grid>
    </Grid>
  );
};

export default Message;
