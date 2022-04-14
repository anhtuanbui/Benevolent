export interface IMember {
    firstName?: string;
    lastName?: string;
    address?: string;
    dateOfBirth: Date;
    id: string;
    userName: string;
    roles: any;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber?: any;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export class Member {
    firstName?: string = '';
    lastName?: string = '';
    address?: string = '';
    dateOfBirth: Date = new Date();
    id: string = '';
    userName: string = '';
    roles: any;
    normalizedUserName: string = '';
    email: string = '';
    normalizedEmail: string = '';
    emailConfirmed: boolean = false;
    passwordHash: string = '';
    securityStamp: string = '';
    concurrencyStamp: string = '';
    phoneNumber?: any;
    phoneNumberConfirmed: boolean = false;
    twoFactorEnabled: boolean = false;
    lockoutEnd?: any;
    lockoutEnabled: boolean = false;
    accessFailedCount: number = 0;
}