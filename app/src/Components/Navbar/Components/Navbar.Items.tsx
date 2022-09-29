import {
    FiLogOut,
    MdNotificationsNone,
    RiAccountBoxLine,
    BiMessageAltDetail
} from "Icons/React.Icons"

export interface listInterface {
    title: string,
    url?: string,
    for?: string,
    icon?: any
}

export const loggedInNavbarItems: listInterface[] = [
    {
        title: 'Posty',
        url: '/',
        icon: BiMessageAltDetail
    },
    {
        title: 'Konto',
        url: '/account',
        icon: RiAccountBoxLine
    },
    {
        title: 'Powiadomienia',
        for: 'notifications',
        icon: MdNotificationsNone
    },
    {
        title: 'Wyloguj',
        for: 'logout',
        icon: FiLogOut
    }
]

export const loggedOutNavbarItems: listInterface[] = [
    {
        title: 'Posty',
        url: '/'
    },
    {
        title: 'Zaloguj',
        for: 'login'
    }
]