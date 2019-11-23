import { Group } from '../types';

export interface GetGroupResponse {
  response: Group;
}

export const getGroup = async (id: string): Promise<Group> => {
  const response = await fetch(
    `https://api.groupme.com/v3/groups/${id}?token=${process.env.groupMeToken}`
  );
  const json: GetGroupResponse = await response.json();
  return json.response;
};
