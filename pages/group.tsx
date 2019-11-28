import React, { FC } from 'react';
import store, { StoreProvider } from '../components/data/types/store';
import GroupPage from '../components/GroupPage';

const rootStore = store.create();
const Group: FC = () => (
  <StoreProvider value={rootStore}>
    <GroupPage />
  </StoreProvider>
);

export default Group;
