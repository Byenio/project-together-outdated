import mongoose from 'mongoose';

export interface SubjectDocument extends mongoose.Document {
    name: String;
}

const subjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});

const SubjectModel = mongoose.model<SubjectDocument>('Subject', subjectSchema);

export default SubjectModel;