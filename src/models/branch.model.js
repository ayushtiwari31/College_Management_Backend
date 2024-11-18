import mongoose, { Schema } from "mongoose";

// Department Schema
const branchSchema = new Schema(
    {
        branch: {
            type: String,
            required: true,
            trim: true 
        },
        year: {
            type: Number,
            required: true, 
            unique: true,
            min: 1, 
            max: 5 
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" 
            }
        ]
    },
    { timestamps: true }
);


export const Branch = mongoose.model("Branch", branchSchema);
