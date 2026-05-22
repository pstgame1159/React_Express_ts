import type { UserRole } from '../types/user';

export const canDelete = (role: UserRole | null): boolean => role === 'MANAGER';
export const canEditOrCreate = (_role: UserRole | null): boolean => true;
