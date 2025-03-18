export interface TbuserappFrm
{
    //id: number,
    applications: string,
    usrsAccesses: string
}

export interface Tbuserapp
{
    //id: number,
    applications: Application[],
    usrsAccesses: UserAccess[]
}

export interface Application
{
    id: number,
    name: string,
    title: string,
    acronym: string,
    description: string,
}

export interface UserAccess
{
    id: number,
    username: string,
    users?: User[],
}

export interface User
{
    id?: number,
    name?: string;
}