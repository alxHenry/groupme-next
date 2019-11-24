import React, { FC } from 'react';
import { Group } from './data/types';
import { List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import Link from 'next/link';

export interface GroupNavProps {
  groups: Group[];
}

const GroupNav: FC<GroupNavProps> = ({ groups }) => {
  const navItems = groups.map(group => (
    <Link href={`/group?id=${group.id}`}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt={group.name} src={group.imageUrl} />
        </ListItemAvatar>
      </ListItem>
    </Link>
  ));

  return <List>{navItems}</List>;
};

export default GroupNav;
