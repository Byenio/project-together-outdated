import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export interface ClassDocument extends mongoose.Document {
    name: String;
}

const classSchema = new mongoose.Schema({

    classId: {
        type: String,
        required: true,
        unique: true,
        default: () => `${nanoId()}`
    },
    name: {
        type: String,
        required: true,
        unique: true
    }

});

const ClassModel = mongoose.model<ClassDocument>('Class', classSchema);

export default ClassModel;