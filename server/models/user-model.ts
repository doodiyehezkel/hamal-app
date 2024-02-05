import { model, Schema, Model, Document } from 'mongoose';

interface UserDoc extends Document {
    name: string,
    password: string,
    role: string
}

const UserSchema: Schema<UserDoc> = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter user name']
    },
    password: {
        type: String,
        required: [true, 'Please enter user password']
    },
    role: {
        type: String,
        enum: ['su', 'rw', 'r'],
        required: [true, 'Please enter user role']
    }
})

UserSchema.post('save', function (error: any, doc: any, next: any): any {

    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error(`User ${doc.name} already exists`));
    } else {
        next();
    }

})
const UserModel: Model<UserDoc> = model('User', UserSchema)
export { UserModel, UserDoc }