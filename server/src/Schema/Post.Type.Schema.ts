import { object, string, TypeOf } from 'zod';

const payload = {

    body: object({

        name: string({
            required_error: 'Name is required'
        })

    })

}

const params = {

    params: object({

        _id: string({
            required_error: 'Type ID is required'
        })

    })

}

export const createPostTypeSchema = object({
    ...payload
})

export const updatePostTypeSchema = object({
    ...payload,
    ...params
})

export const deletePostTypeSchema = object({
    ...params
})

export const getPostTypeSchema = object({
    ...params
})

export const getAllPostsTypesSchema = object({})

export type createPostTypeInput = TypeOf<typeof createPostTypeSchema>
export type updatePostTypeInput = TypeOf<typeof updatePostTypeSchema>
export type deletePostTypeInput = TypeOf<typeof deletePostTypeSchema>
export type getPostTypeInput = TypeOf<typeof getPostTypeSchema>
export type getAllPostsTypesInput = TypeOf<typeof getAllPostsTypesSchema>