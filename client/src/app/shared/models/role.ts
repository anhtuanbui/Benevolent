export interface IRole {
    id: string;
    name: string;
    normalizedName: string;
    concurrencyStamp: string;
}
export class Role {
    id: string = '';
    name: string = '';
    normalizedName: string = '';
    concurrencyStamp: string = '';
}
