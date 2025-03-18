export interface TbAppObjFrm
{
    applications: string,
    objects: string,
}

export interface TbAppObj
{
    //id: number,
    applications: Application[],
    objects: Object[],
}

export interface Application
{
    id: number,
    name: string,
    title: string,
    acronym: string,
    description: string,
}

export interface Object
{
    id: number,
    title: string,
    description: string,
}