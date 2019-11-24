import { Group } from '../types';

export interface GetGroupsResponse {
  response: Group[];
}

export const getGroups = async (): Promise<Group[]> => {
  const response = await fetch(
    `https://api.groupme.com/v3/groups?token=${process.env.groupMeToken}`
  );
  const json: GetGroupsResponse = await response.json();
  return json.response;
};
