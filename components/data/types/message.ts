import { types, Instance } from 'mobx-state-tree';
import { User } from './user';

export interface MessageType {
  id: string;
  text: string | null;
  sender: User['id'];
  name: string; // TODO: Normalize users and use the user id to look this up in store
  avatarUrl: string; // TODO: Normalize users and use the user id to look this up in store
  favoritedBy: User['id'][];
  system: boolean;
}

export type MessageModel = Instance<typeof Message>;

const Message = types
  .model('Message', {
    id: types.identifier,
    text: types.maybeNull(types.string),
    sender: types.string,
    name: types.string, // TODO: Normalize users and use the user id to look this up in store
    avatarUrl: types.string, // TODO: Normalize users and use the user id to look this up in store
    favoritedBy: types.array(types.string),
    system: types.boolean,
  })
  .actions(self => ({
    like: (userId: string) => {
      const removed = self.favoritedBy.remove(userId);
      if (removed) {
        return;
      }

      self.favoritedBy.push(userId);
    },
  }));

export default Message;
