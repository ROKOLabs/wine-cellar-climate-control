import { User } from 'features/db/DbService';

export const getUserInitials = (userDetails: User | undefined) =>
  userDetails?.name && userDetails?.lastname
    ? `${userDetails.name.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
    : '';
