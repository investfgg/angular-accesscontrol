export interface TbusraccessFrm
{
    //id: number,
    username: string,
    password: string,
    tip: string,
    users: string,
    //createdAt: Date
}

export interface Tbusraccess
{
    //id: number,
    username: string,
    password: string,
    tip: string,
    users: User[],
    //createdAt: Date
}

export interface User
{
    id: number,
    name: string,
    email: string,
    //description: string
    //createdAt: Date
}

export interface TbUsrAccessSelect
{
    id: number,
    username: string,
    id_users: User[],
}