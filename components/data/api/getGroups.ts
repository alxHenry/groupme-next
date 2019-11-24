import { Group } from '../types';

export interface GetGroupsResponse {
  response: RawGroup[];
}

export interface RawGroup {
  id: string;
  name: string;
  image_url: string;
  description: string;
}

const normalizeRawGroup = (rawGroup: RawGroup): Group => ({
  id: rawGroup.id,
  name: rawGroup.name,
  imageUrl: rawGroup.image_url,
  description: rawGroup.description,
});

export const getGroups = async (): Promise<Group[]> => {
  const response = await fetch(
    `https://api.groupme.com/v3/groups?token=${process.env.groupMeToken}`
  );
  const json: GetGroupsResponse = await response.json();
  return json.response.map(normalizeRawGroup);
};
