import { object, string, TypeOf } from 'zod';

const payload = {

    body: object({

        subject: string({
            required_error: 'Subject is required'
        }),
        description: string({
            required_error: 'Description is required'
        })

    })

}

const params = {

    params: object({

        _id: string({
            required_error: 'Post ID is required'
        })

    })

}

export const createPostSchema = object({
    ...payload
})

export const updatePostSchema = object({
    ...payload,
    ...params
})

export const deletePostSchema = object({
    ...params
})

export const getPostSchema = object({
    ...params
})

export const getAllPostsSchema = object({})

export type createPostInput = TypeOf<typeof createPostSchema>
export type updatePostInput = TypeOf<typeof updatePostSchema>
export type deletePostInput = TypeOf<typeof deletePostSchema>
export type getPostInput = TypeOf<typeof getPostSchema>
export type getAllPostsInput = TypeOf<typeof getAllPostsSchema>
