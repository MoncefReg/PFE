export type UserRoles = 'user' | 'admin' | 'manager';

export interface User {
  firstName: string;
  lastName: string;
  role: UserRoles;
}
