export class Util {
  static isNullOrUndefined<T>(
    obj: T | null | undefined
  ): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }
}

export enum RolesEnum {
  SuperAdmin = 1,
  Admin = 2,
  User = 3,
  Company = 4,
}

export const Roles = [
  { name: 'Super Admin', value: 1 },
  { name: 'Admin', value: 2 },
  { name: 'User', value: 3 },
  { name: 'Company', value: 4 },
];
