export interface listInterface {
    title: string,
    url: string,
    submenu?: any[]
}

export const accountNavItems_zero: listInterface[] = [
    {
        title: 'Ustawienia konta',
        url: '/account/settings'
    }
]

export const accountNavItems_one: listInterface[] = [
    {
        title: 'Posty użytkownika',
        url: '/account'
    },
    {
        title: 'Nowy post',
        url: '/account/new-post'
    },
    {
        title: 'Ustawienia konta',
        url: '/account/settings'
    }
]

export const accountNavItems_two: listInterface[] = [
    {
        title: 'Posty użytkownika',
        url: '/account'
    },
    {
        title: 'Nowy post',
        url: '/account/new-post'
    },
    {
        title: 'Zarządzaj bazą',
        url: '/account/manage',
        submenu: [
            {
                title: 'Pomagający',
                url: '/account/manage/tutors'
            },
            {
                title: 'Klasy',
                url: '/account/manage/classes'
            },
            {
                title: 'Przedmioty',
                url: '/account/manage/subjects'
            },
            {
                title: 'Typy postów',
                url: '/account/manage/post-types'
            }
        ]
    },
    {
        title: 'Ustawienia konta',
        url: '/account/settings'
    }
]