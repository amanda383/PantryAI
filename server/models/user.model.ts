import mongoose, {Document, Schema, Model} from "mongoose";
import bcrypt from 'bcryptjs'


export interface IUser extends Document {
    name: string,
    email: string;
    password: string;
    avatar?: string;
    recipes: mongoose.Types.ObjectId[];
    uploadedImages: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
    name: {type: String },
    email: { type: String, required: true, unique: true, message: 'Please enter email'},
    password: { type: String, required: true },
    avatar: { type: String },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    uploadedImages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
});

export default mongoose.model<IUser>("User", userSchema);
