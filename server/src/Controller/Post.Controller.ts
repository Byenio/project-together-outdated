import { Request, Response } from 'express';
import { createPostInput, updatePostInput } from '../Schema/Post.Schema';
import { createPost, findPost, findAndUpdatePost, deletePost } from '../Service/Post.Service';

export async function createPostHandler(
    req: Request<{}, {}, createPostInput['body']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const body = req.body;
    const post = await createPost({ ...body, user: userId });

    return res.send(post);

}

export async function updatePostHandler(
    req: Request<updatePostInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const postId = req.params.postId;
    const update = req.body;
    const post = await findPost({ postId });

    if (!post) {
        return res.status(404);
    }

    if (String(post.user) !== userId) {
        return res.status(403);
    }

    const updatedPost = await findAndUpdatePost(
        { postId },
        update,
        { new: true }
    );

    return res.send(updatedPost);

}

export async function getPostHandler(
    req: Request<updatePostInput['params']>,
    res: Response
) {

    const postId = req.params.postId;

    const post = await findPost({ postId });

    if (!post) {
        return res.status(404);
    }

    return res.send(post);

}

export async function deletePostHandler(
    req: Request<updatePostInput['params']>,
    res: Response
) {

    const userId = res.locals.user._id;

    const postId = req.params.postId;
    const post = await findPost({ postId });

    if (!post) {
        return res.status(404);
    }

    if (String(post.user) !== userId) {
        return res.status(403);
    }

    await deletePost({ postId });

    return res.sendStatus(200);

}