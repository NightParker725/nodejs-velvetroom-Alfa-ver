import { UserRole } from './role.type';

export interface UserInput {
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  role?: UserRole;       // default 'client' al registrarse por el moemnto
  address?: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  role?: UserRole;
  address?: string;
}
