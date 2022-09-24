import mongoose from 'mongoose';

export interface PermissionDocument extends mongoose.Document {
    name: String;
    level: Number;
}

const permissionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: Number,
        required: true
    }

});

const PermissionModel = mongoose.model<PermissionDocument>('Permission', permissionSchema);

export default PermissionModel;