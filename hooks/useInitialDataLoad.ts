import { GroupType } from '../components/data/types';
import { useStore } from '../components/data/types/store';
import { useCallback, useEffect } from 'react';
import { getGroups } from '../components/data/api/groups';
import { getMessages } from '../components/data/api/messages';

const useInitialDataLoad = async (groupId?: GroupType['id']) => {
  const { groups, setGroups, addMessages } = useStore();

  const loadInitialData = useCallback(async () => {
    const fetchedGroups = await getGroups();
    setGroups(fetchedGroups);

    const groupIdToFetchMessagesFrom = groupId || fetchedGroups[0].id;
    const fetchedMessages = await getMessages(groupIdToFetchMessagesFrom);

    addMessages(fetchedMessages);

    const group = groups.get(groupIdToFetchMessagesFrom);
    if (group) {
      group.addMessages(fetchedMessages.map(message => message.id));
      console.log(group.messages);
    }
  }, [groupId]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);
};

export default useInitialDataLoad;
