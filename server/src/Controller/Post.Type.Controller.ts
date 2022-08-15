import { Request, Response } from 'express';
import {
    createPostTypeInput,
    updatePostTypeInput,
    deletePostTypeInput,
    getPostTypeInput,
    getAllPostsTypesInput
} from '../Schema/Post.Type.Schema';
import {
    createPostType,
    findPostType,
    findAndUpdatePostType,
    deletePostType,
    findAllPostsTypes
} from '../Service/Post.Type.Service';

export async function createPostTypeHandler(
    req: Request<{}, {}, createPostTypeInput['body']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const body = req.body;

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const type = await createPostType({ ...body });

    return res.send(type);

}

export async function updatePostTypeHandler(
    req: Request<updatePostTypeInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const TypeId = req.params._id;
    const update = req.body;
    const TypeUpdate = await findPostType({ TypeId });

    if (!TypeUpdate) {
        return res.status(404).json({
            message: 'Type not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const updatedType = await findAndUpdatePostType(
        { TypeId },
        update,
        { new: true }
    );

    return res.send(updatedType);

}

export async function getPostTypeHandler(
    req: Request<getPostTypeInput['params']>,
    res: Response
) {

    const TypeId = req.params._id;

    const TypeRes = await findPostType({ TypeId });

    if (!TypeRes) {
        return res.status(404).json({
            message: 'Type not found'
        })
    }
    
    return res.send(TypeRes);

}

export async function getAllPostTypesHandler(
    req: Request<getAllPostsTypesInput>,
    res: Response
) {

    const Types = await findAllPostsTypes();

    if (!Types.length) {
        return res.status(404).json({
            message: 'No Types found'
        })
    }

    return res.send(Types);

}

export async function deletePostTypeHandler(
    req: Request<deletePostTypeInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const TypeId = req.params._id;
    const TypeRes = await findPostType({ TypeId });

    if (!TypeRes) {
        return res.status(404).json({
            message: 'Type not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }

    await deletePostType({ TypeId });

    return res.sendStatus(200).json({
        message: 'Type deleted'
    });

}