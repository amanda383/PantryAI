import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
    url: string;
    detectedIngredients: string[];
    uploadedBy: mongoose.Types.ObjectId;
}

const imageSchema: Schema = new Schema({
    url: { type: String, required: true },
    detectedIngredients: [{ type: String }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IImage>("Image", imageSchema);
