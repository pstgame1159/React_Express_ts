export type UserRole = 'MANAGER' | 'TEAMLEADER' | 'FLOORSTAFF';

export interface UserPublic {
  id: number;
  username: string;
  role: UserRole;
  created_at: string;
}
