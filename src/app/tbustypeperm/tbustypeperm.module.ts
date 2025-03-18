export interface TbustypepermFrm
{
    usertypes: string,
    permissions: string,
}

export interface Tbustypeperm
{
    //id: number;
    usertypes: UserType[],
    permissions: Permission[],
}

export interface UserType
{
    id: number,
    title: string,
    description: string,
}

export interface Permission
{
    id: number,
    title: string,
    description: string,
}