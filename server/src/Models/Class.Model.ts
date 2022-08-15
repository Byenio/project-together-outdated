import mongoose from 'mongoose';

export interface ClassDocument extends mongoose.Document {
    name: String;
}

const classSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});

const ClassModel = mongoose.model<ClassDocument>('Class', classSchema);

export default ClassModel;