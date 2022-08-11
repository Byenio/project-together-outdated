import { number, object, string, TypeOf } from 'zod';
import { createUser } from '../Service/User.Service';

export const createUserSchema = object({

    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password is too short - 6 chars minimum'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email'),
        class: string({
            required_error: 'Class is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),

});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation' | 'body.permissionLevel'>;