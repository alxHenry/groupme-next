import { types, Instance, cast } from 'mobx-state-tree';
import Message, { MessageType } from './message';
import Group, { GroupType } from './group';
import { createContext, useContext } from 'react';

export type RootStoreModel = Instance<typeof RootStore>;

const RootStore = types
  .model('RootStore', {
    messages: types.array(Message),
    groups: types.array(Group),
  })
  .actions(self => ({
    addMessage: (message: MessageType) => {
      self.messages.push(message);
    },
    setMessages: (messages: MessageType[]) => {
      self.messages = cast(messages);
    },
    addGroup: (group: GroupType) => {
      self.groups.push(group);
    },
    setGroups: (groups: GroupType[]) => {
      self.groups = cast(groups);
    },
  }));

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
export default RootStore;
