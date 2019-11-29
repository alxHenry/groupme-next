import { GroupType } from '../types';

export interface GetGroupsResponse {
  response: RawGroup[];
}

export interface RawGroup {
  id: string;
  name: string;
  image_url: string;
  description: string;
  messages: {
    count: number;
    last_message_id: string;
  };
}

const normalizeRawGroup = (rawGroup: RawGroup): GroupType => ({
  id: rawGroup.id,
  name: rawGroup.name,
  imageUrl: rawGroup.image_url,
  description: rawGroup.description,
  messages: [],
});

export const getGroups = async (): Promise<GroupType[]> => {
  const response = await fetch(
    `https://api.groupme.com/v3/groups?token=${process.env.groupMeToken}`
  );
  const json: GetGroupsResponse = await response.json();
  return json.response.map(normalizeRawGroup);
};
