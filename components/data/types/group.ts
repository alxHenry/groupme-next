import { types, Instance } from 'mobx-state-tree';
import Message, { MessageType } from './message';

export interface GroupType {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
  messages: MessageType['id'][];
}

export type GroupModel = Instance<typeof Group>;

const Group = types
  .model('Group', {
    id: types.identifier,
    name: types.string, // TODO: Normalize users and use the user id to look this up in store
    imageUrl: types.maybeNull(types.string), // TODO: Normalize users and use the user id to look this up in store
    description: types.string,
    messages: types.array(types.reference(Message)),
  })
  .actions(self => ({
    addMessages: (messageIds: MessageType['id'][]) => {
      self.messages = self.messages.concat(messageIds) as typeof self.messages;
    },
  }));

export default Group;
