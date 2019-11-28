import { User, GroupType, MessageType } from '../types';
import { v4 as generateUuid } from 'uuid';

export interface GetMessagesResponse {
  response: {
    count: number;
    messages: RawMessage[];
  };
}

export interface SendMessageResponse {
  response: {
    message: RawMessage;
  };
}

export interface RawMessage {
  id: string;
  text: string | null;
  user_id: User['id'];
  name: string;
  avatar_url: string;
  favorited_by: User['id'][];
  system: boolean;
}

const groupsUrl = 'https://api.groupme.com/v3/groups';

const normalizeRawMessage = (rawMessage: RawMessage): MessageType => ({
  id: rawMessage.id,
  text: rawMessage.text,
  sender: rawMessage.user_id,
  name: rawMessage.name,
  avatarUrl: rawMessage.avatar_url,
  favoritedBy: rawMessage.favorited_by,
  system: rawMessage.system,
});

export const getMessages = async (
  groupId: GroupType['id']
): Promise<MessageType[]> => {
  const response = await fetch(
    `${groupsUrl}/${groupId}/messages?limit=30&token=${process.env.groupMeToken}`
  );
  const json: GetMessagesResponse = await response.json();
  return json.response.messages.map(normalizeRawMessage).reverse();
};

export const sendMessage = async (
  groupId: GroupType['id'],
  body: string
): Promise<MessageType> => {
  const requestBody = {
    message: {
      source_guid: generateUuid(),
      text: body,
    },
  };
  const response = await fetch(
    `${groupsUrl}/${groupId}/messages?token=${process.env.groupMeToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );
  const json: SendMessageResponse = await response.json();

  return normalizeRawMessage(json.response.message);
};
