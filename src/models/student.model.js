import mongoose, { Schema } from "mongoose";

// College Student Schema
const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true 
        },
        rollNo: {
            type: String,
            required: true,
            unique: true 
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department", 
            required: true 
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"], // Enum for gender options
            required: true 
        },
        year: {
            type: Number,
            required: true,
            min: 1,
            max: 5 
        },
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course" 
            }
        ],
        yearOfJoining: {
            type: Number, 
            min: 2000, 
            max: new Date().getFullYear() ,
            
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the Student model
export const Student = mongoose.model("Student", studentSchema);
