import React, { FC } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStore } from './data/types/store';

const GroupNav: FC = observer(() => {
  const { groups } = useStore();

  const navItems: JSX.Element[] = [];
  groups.forEach(group => {
    navItems.push(
      <Link key={group.id} href={`/group?id=${group.id}`}>
        <Tooltip title={group.name} placement="bottom-start">
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={group.name} src={group.imageUrl || undefined} />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
    );
  });

  return <List>{navItems}</List>;
});

export default GroupNav;
