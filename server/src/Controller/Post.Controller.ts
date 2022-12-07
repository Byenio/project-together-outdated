import { Request, Response } from 'express';
import {
    createPostInput,
    updatePostInput,
    deletePostInput,
    getPostInput,
    getAllPostsInput,
    getPostsByUserInput
} from '../Schema/Post.Schema';
import {
    getUser
} from '../Service/User.Service';
import {
    createPost,
    findPost,
    findAndUpdatePost,
    deletePost,
    findAllPosts,
    findPostsByUser
} from '../Service/Post.Service';

export async function createPostHandler(
    req: Request<{}, {}, createPostInput['body']>,
    res: Response
) {

    const _id = res.locals.user._id;
    const user = await getUser({ _id })
    const userPermission = await user!.permissionLevel!.level;

    if (Number(userPermission) !== 1 && Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'You are not authorized to create a post.'
        })
    }

    const body = req.body;
    const post = await createPost({ ...body, user: _id });

    return res.send(post);

}

export async function updatePostHandler(
    req: Request<updatePostInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const _id = req.params._id;
    const update = req.body;
    const post = await findPost({ _id });

    if (!post) {
        return res.status(404).json({
            message: 'Post not found'
        });
    }

    if (String(post.user) !== userId) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const updatedPost = await findAndUpdatePost(
        { _id },
        update,
        { new: true }
    );

    return res.send(updatedPost);

}

export async function getPostHandler(
    req: Request<getPostInput['params']>,
    res: Response
) {

    const _id = req.params._id;

    const post = await findPost({ _id });

    if (!post) {
        return res.status(404);
    }

    return res.send(post);

}

export async function getPostsByUserHandler(
    req: Request<getPostsByUserInput>,
    res: Response
) {

    const _id = res.locals.user._id;

    const posts = await findPostsByUser({ _id });

    if (!posts.length) {
        return res.status(404);
    }

    if (String(posts[0].user._id) !== _id) {
        return res.status(403);
    }

    return res.send(posts);

}

export async function getAllPostsHandler(
    req: Request<getAllPostsInput>,
    res: Response
) {

    const posts = await findAllPosts();

    if (!posts.length) {
        return res.status(404);
    }

    return res.send(posts);

}

export async function deletePostHandler(
    req: Request<deletePostInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const _id = req.params._id;
    const post = await findPost({ _id });

    if (!post) {
        return res.status(404);
    }

    if (String(post.user) !== userId) {
        return res.status(403);
    }

    await deletePost({ _id });

    return res.sendStatus(200).json({
        message: 'Post deleted'
    });

}