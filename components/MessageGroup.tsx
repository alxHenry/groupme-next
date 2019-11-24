import React, { FC, ReactElement } from 'react';
import { Message as MessageData } from './data/types';
import Message from './Message';
import { Box } from '@material-ui/core';

export interface MessageGroupProps {
  messages: MessageData[];
}

const MessageGroup: FC<MessageGroupProps> = ({
  messages,
}: MessageGroupProps) => {
  const content = messages.map((messageItem, index) => {
    const isFirstMessage = index === 0;

    return (
      <Box style={{ marginBottom: '8px' }}>
        <Message
          key={messageItem.id}
          name={messageItem.name}
          messageBody={messageItem.text}
          avatarUrl={messageItem.avatarUrl}
          withHeader={isFirstMessage}
        />
      </Box>
    );
  });

  return <Box style={{ marginBottom: '24px' }}>{content}</Box>;
};

export default MessageGroup;
