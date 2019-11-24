import { Message } from '../types';

export const collapseMessagesBySender = (messages: Message[]): Message[][] => {
  const results: Message[][] = [[]];
  if (!messages.length) {
    return [];
  }

  let lastSenderId = messages[0].sender;

  messages.forEach(messageItem => {
    if (messageItem.sender === lastSenderId) {
      const lastMessageGroup = results[results.length - 1];
      lastMessageGroup.push(messageItem);
    } else {
      lastSenderId = messageItem.sender;
      results.push([messageItem]);
    }
  });

  return results;
};
