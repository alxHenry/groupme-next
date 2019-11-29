import React, { FC } from 'react';
import store, { StoreProvider } from '../components/data/types/store';
import GroupPage from '../components/GroupPage';

const Group: FC = () => (
  <StoreProvider value={store}>
    <GroupPage />
  </StoreProvider>
);

export default Group;
