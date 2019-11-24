import { User, Group, Message } from '../types';

export interface GetMessagesResponse {
  response: {
    count: number;
    messages: RawMessage[];
  };
}

export interface RawMessage {
  id: string;
  text: string;
  user_id: User['id'];
  name: string;
  avatar_url: string;
  favorited_by: User['id'][];
  system: boolean;
}

const normalizeRawMessage = (rawMessage: RawMessage): Message => ({
  id: rawMessage.id,
  text: rawMessage.text,
  sender: rawMessage.user_id,
  name: rawMessage.name,
  avatarUrl: rawMessage.avatar_url,
  favoritedBy: rawMessage.favorited_by,
  system: rawMessage.system,
});

export const getMessages = async (groupId: Group['id']): Promise<Message[]> => {
  const response = await fetch(
    `https://api.groupme.com/v3/groups/${groupId}/messages?token=${process.env.groupMeToken}`
  );
  const json: GetMessagesResponse = await response.json();
  return json.response.messages.map(normalizeRawMessage).reverse();
};
