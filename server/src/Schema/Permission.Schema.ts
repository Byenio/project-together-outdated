import { object, string, number, TypeOf } from 'zod';

const payload = {

    body: object({

        name: string({
            required_error: 'Name is required'
        }),
        value: number({
            required_error: 'Value is required'
        })

    })

}

const params = {

    params: object({
        
        _id: string({
            required_error: 'Permission ID is required'
        })

    })

}

export const createPermissionSchema = object({
    ...payload
})

export const updatePermissionSchema = object({
    ...payload,
    ...params
})

export const deletePermissionSchema = object({
    ...params
})

export const getPermissionSchema = object({
    ...params
})

export const getAllPermissionsSchema = object({})

export type createPermissionInput = TypeOf<typeof createPermissionSchema>
export type updatePermissionInput = TypeOf<typeof updatePermissionSchema>
export type deletePermissionInput = TypeOf<typeof deletePermissionSchema>
export type getPermissionInput = TypeOf<typeof getPermissionSchema>
export type getAllPermissionsInput = TypeOf<typeof getAllPermissionsSchema>