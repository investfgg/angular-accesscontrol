export interface Tbprofile
{
    id: number,
    usersapps:
    {
        id: number,
        applications:
        {
            id: number,
            name: string,
            title: string,
            acronym: string
        },
        usrsAccesses:
        {
            id: number,
            username: string,
        },
    },
    appsobjs:
    {
        id: number,
        applications:
        {
            id: number,
            name: string,
            title: string,
            acronym: string,
        },
        objects:
        {
            id: number,
            title: string,
            description: string,
        }
    },
    ustypeperms:
    {
        id: number,
        usertypes:
        {
            id: number,
            title: string,
            description: string,
        },
        permissions:
        {
            id: number,
            title: string,
            description: string,
        },
    },
}