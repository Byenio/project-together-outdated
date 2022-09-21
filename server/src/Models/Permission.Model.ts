import mongoose from 'mongoose';

export interface PermissionDocument extends mongoose.Document {
    name: String;
    value: Number;
}

const permissionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        unique: true
    }

});

const PermissionModel = mongoose.model<PermissionDocument>('Permission', permissionSchema);

export default PermissionModel;