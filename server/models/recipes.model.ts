import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
    title: string;
    ingredients: string[];
    instructions: string[];
    createdBy: mongoose.Types.ObjectId;
}

const recipeSchema: Schema = new Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IRecipe>("Recipe", recipeSchema);
