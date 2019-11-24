import React, { FC } from 'react';
import { Group } from './data/types';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import Link from 'next/link';

export interface GroupNavProps {
  groups: Group[];
}

const GroupNav: FC<GroupNavProps> = ({ groups }) => {
  const navItems = groups.map(group => (
    <Link key={group.id} href={`/group?id=${group.id}`}>
      <Tooltip title={group.name} placement="bottom-start">
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt={group.name} src={group.imageUrl} />
          </ListItemAvatar>
        </ListItem>
      </Tooltip>
    </Link>
  ));

  return <List>{navItems}</List>;
};

export default GroupNav;
