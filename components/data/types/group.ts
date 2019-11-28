import { types, Instance } from 'mobx-state-tree';

export interface GroupType {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
}

export type GroupModel = Instance<typeof Group>;

const Group = types.model('Group', {
  id: types.string,
  name: types.string, // TODO: Normalize users and use the user id to look this up in store
  imageUrl: types.maybeNull(types.string), // TODO: Normalize users and use the user id to look this up in store
  description: types.string,
});

export default Group;
