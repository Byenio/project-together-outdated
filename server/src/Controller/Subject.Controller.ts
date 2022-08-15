import { Request, Response } from 'express';
import {
    createSubjectInput,
    updateSubjectInput,
    deleteSubjectInput,
    getSubjectInput,
    getAllSubjectsInput
} from '../Schema/Subject.Schema';
import {
    createSubject,
    findSubject,
    findAndUpdateSubject,
    deleteSubject,
    findAllSubjects
} from '../Service/Subject.Service';

export async function createSubjectHandler(
    req: Request<{}, {}, createSubjectInput['body']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const body = req.body;

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const newSubject = await createSubject({ ...body });

    return res.send(newSubject);

}

export async function updateSubjectHandler(
    req: Request<updateSubjectInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const SubjectId = req.params._id;
    const update = req.body;
    const SubjectUpdate = await findSubject({ SubjectId });

    if (!SubjectUpdate) {
        return res.status(404).json({
            message: 'Subject not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    const updatedSubject = await findAndUpdateSubject(
        { SubjectId },
        update,
        { new: true }
    );

    return res.send(updatedSubject);

}

export async function getSubjectHandler(
    req: Request<getSubjectInput['params']>,
    res: Response
) {

    const SubjectId = req.params._id;

    const SubjectRes = await findSubject({ SubjectId });

    if (!SubjectRes) {
        return res.status(404).json({
            message: 'Subject not found'
        })
    }
    
    return res.send(SubjectRes);

}

export async function getAllSubjectsHandler(
    req: Request<getAllSubjectsInput>,
    res: Response
) {

    const Subjects = await findAllSubjects();

    if (!Subjects.length) {
        return res.status(404).json({
            message: 'No Subjectes found'
        })
    }

    return res.send(Subjects);

}

export async function deleteSubjectHandler(
    req: Request<deleteSubjectInput['params']>,
    res: Response
) {

    const userPermission = res.locals.user.permissionLevel;

    const SubjectId = req.params._id;
    const SubjectRes = await findSubject({ SubjectId });

    if (!SubjectRes) {
        return res.status(404).json({
            message: 'Subject not found'
        })
    }

    if (Number(userPermission) !== 2) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }

    await deleteSubject({ SubjectId });

    return res.sendStatus(200).json({
        message: 'Subject deleted'
    });

}