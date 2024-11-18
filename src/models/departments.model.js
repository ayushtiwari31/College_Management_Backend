import mongoose, { Schema } from "mongoose";

// Department Schema
const departmentSchema = new Schema(
    {
        branches: {
            type: Schema.Types.ObjectId,
            ref: "Branch", 
            default: null 
        }
    },
    { timestamps: true } 
);

// Export the Department model
export const Department = mongoose.model("Department", departmentSchema);
