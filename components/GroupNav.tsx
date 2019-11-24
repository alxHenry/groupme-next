import React, { FC } from 'react';
import { Group } from './data/types';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import Link from 'next/link';

export interface GroupNavProps {
  groups: Group[];
}

const GroupNav: FC<GroupNavProps> = ({ groups }) => {
  const navItems = groups.map(group => {
    const navItem = (
      <Link href={`/group?id=${group.id}`}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt={group.name} src={group.imageUrl} />
          </ListItemAvatar>
          <ListItemText primary={group.name} />
        </ListItem>
      </Link>
    );

    return navItem;
  });

  return <List>{navItems}</List>;
};

export default GroupNav;
