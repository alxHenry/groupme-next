import { types, Instance } from 'mobx-state-tree';
import Message, { MessageType } from './message';
import Group, { GroupType } from './group';
import { createContext, useContext } from 'react';
import { connectReduxDevtools } from 'mst-middlewares';

export type RootStoreModel = Instance<typeof RootStore>;
const RootStore = types
  .model('RootStore', {
    messages: types.map(Message),
    groups: types.map(Group),
  })
  .actions(self => ({
    addMessages: (messages: MessageType[]) => {
      const messageEntries = messages.map(message => [message.id, message]);
      self.messages.merge(messageEntries);
    },
    addGroup: (group: GroupType) => {
      self.groups.set(group.id, group);
    },
    setGroups: (groups: GroupType[]) => {
      const groupEntries = groups.map(group => [group.id, group]);
      self.groups.replace(groupEntries);
    },
  }));

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;

const rootStore = RootStore.create();
connectReduxDevtools(require('remotedev'), rootStore);

export default rootStore;
