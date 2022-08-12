import { object, string, TypeOf } from 'zod';

const payload = {

    body: object({

        name: string({
            required_error: 'Class name is required'
        })

    })

}

const params = {

    params: object({

        _id: string({
            required_error: 'Class ID is required'
        })

    })

}

export const createClassSchema = object({
    ...payload
})

export const updateClassSchema = object({
    ...payload,
    ...params
})

export const deleteClassSchema = object({
    ...params
})

export const getClassSchema = object({
    ...params
})

export const getAllClassesSchema = object({})

export type createClassInput = TypeOf<typeof createClassSchema>
export type updateClassInput = TypeOf<typeof updateClassSchema>
export type deleteClassInput = TypeOf<typeof deleteClassSchema>
export type getClassInput = TypeOf<typeof getClassSchema>
export type getAllClassesInput = TypeOf<typeof getAllClassesSchema>