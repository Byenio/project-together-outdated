import { object, string, TypeOf } from 'zod';

const payload = {

    body: object({

        name: string({
            required_error: 'Subject name is required'
        })

    })

}

const params = {

    params: object({

        _id: string({
            required_error: 'Subject ID is required'
        })

    })

}

export const createSubjectSchema = object({
    ...payload
})

export const updateSubjectSchema = object({
    ...payload,
    ...params
})

export const deleteSubjectSchema = object({
    ...params
})

export const getSubjectSchema = object({
    ...params
})

export const getAllSubjectsSchema = object({})

export type createSubjectInput = TypeOf<typeof createSubjectSchema>
export type updateSubjectInput = TypeOf<typeof updateSubjectSchema>
export type deleteSubjectInput = TypeOf<typeof deleteSubjectSchema>
export type getSubjectInput = TypeOf<typeof getSubjectSchema>
export type getAllSubjectsInput = TypeOf<typeof getAllSubjectsSchema>