export type UserRole = 'MANAGER' | 'TEAMLEADER' | 'FLOORSTAFF';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  created_at: string;
}

export interface UserPublic {
  id: number;
  username: string;
  role: UserRole;
  created_at: string;
}
