import { User } from './user';

export interface Message {
  id: string;
  text: string;
  sender: User['id'];
  name: string; // TODO: Normalize users and use the user id to look this up in store
  avatarUrl: string; // TODO: Normalize users and use the user id to look this up in store
  favoritedBy: User['id'][];
  system: boolean;
}
