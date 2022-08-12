import { Request, Response } from 'express';
import {
    createPostInput,
    updatePostInput,
    deletePostInput,
    getPostInput
} from '../Schema/Post.Schema';
import {
    createPost,
    findPost,
    findAndUpdatePost,
    deletePost,
    findAllPosts
} from '../Service/Post.Service';

export async function createPostHandler(
    req: Request<{}, {}, createPostInput['body']>,
    res: Response
) {

    const userId = res.locals.user._id;
    const userClass = res.locals.user.class;
    const userPermission = res.locals.user.permissionLevel;

    if (Number(userPermission) !== 1 && Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'You are not authorized to create a post.'
        })
    }

    const body = req.body;
    const post = await createPost({ ...body, user: userId, class: userClass });

    return res.send(post);

}

export async function updatePostHandler(
    req: Request<updatePostInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const postId = req.params._id;
    const update = req.body;
    const post = await findPost({ postId });

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
        { postId },
        update,
        { new: true }
    );

    return res.send(updatedPost);

}

export async function getPostHandler(
    req: Request<getPostInput['params']>,
    res: Response
) {

    const postId = req.params._id;

    const post = await findPost({ postId });

    if (!post) {
        return res.status(404);
    }

    return res.send(post);

}

export async function getAllPostsHandler(
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

    const postId = req.params._id;
    const post = await findPost({ postId });

    if (!post) {
        return res.status(404);
    }

    if (String(post.user) !== userId) {
        return res.status(403);
    }

    await deletePost({ postId });

    return res.sendStatus(200).json({
        message: 'Post deleted'
    });

}