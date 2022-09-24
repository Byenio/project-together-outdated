import {
    BiMessageAltAdd,
    BiMessageAltDetail,
    FiDatabase,
    FiSettings,
    VscMortarBoard,
    SiGoogleclassroom,
    BiBookBookmark,
    MdFormatListBulleted
} from "../../../Icons/React.Icons"

export interface listInterface {
    title: string,
    url: string,
    submenu?: any[],
    icon?: any,
    for?: string
}

export const accountNavItems_zero: listInterface[] = [
    {
        title: 'Ustawienia konta',
        url: '/account/settings',
        icon: FiSettings
    }
]

export const accountNavItems_one: listInterface[] = [
    {
        title: 'Posty użytkownika',
        url: '/account',
        icon: BiMessageAltDetail
    },
    {
        title: 'Nowy post',
        url: '/account/new-post',
        icon: BiMessageAltAdd
    },
    {
        title: 'Ustawienia konta',
        url: '/account/settings',
        icon: FiSettings
    }
]

export const accountNavItems_two: listInterface[] = [
    {
        title: 'Posty użytkownika',
        url: '/account',
        icon: BiMessageAltDetail
    },
    {
        title: 'Nowy post',
        url: '/account/new-post',
        icon: BiMessageAltAdd
    },
    {
        title: 'Zarządzaj bazą',
        url: '/account/manage',
        icon: FiDatabase,
        submenu: [
            {
                title: 'Użytkownicy',
                url: '/account/manage/users',
                icon: VscMortarBoard
            },
            {
                title: 'Klasy',
                url: '/account/manage/classes',
                icon: SiGoogleclassroom
            },
            {
                title: 'Przedmioty',
                url: '/account/manage/subjects',
                icon: BiBookBookmark
            },
            {
                title: 'Typy postów',
                url: '/account/manage/post-types',
                icon: MdFormatListBulleted
            }
        ]
    },
    {
        title: 'Ustawienia konta',
        url: '/account/settings',
        icon: FiSettings
    }
]