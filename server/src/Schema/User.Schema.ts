import { number, object, string, TypeOf } from 'zod';

const payload = {

    body: object({

        permissionLevel: string({
            required_error: 'Permission is required'
        })

    })

}

const params = {

    params: object({
        _id: string({
            required_error: 'User ID is required'
        })
    })

}

export const createUserSchema = object({

    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short - 6 chars minimum'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        class: string({
            required_error: 'Class is required'
        }),
        permissionLevel: string({
            required_error: 'Permission is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),

});

export const getPublicUserSchema = object({
    ...params
})
export const getPrivateUserSchema = object({});
export const getAllUsersSchema = object({});
export const updateUserSchema = object({
    ...payload,
    ...params
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation' | 'body.permissionLevel'>;
export type GetPublicUserInput = TypeOf<typeof getPublicUserSchema>
export type GetPrivateUserInput = TypeOf<typeof getPrivateUserSchema>
export type GetAllUsersInput = TypeOf<typeof getAllUsersSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>