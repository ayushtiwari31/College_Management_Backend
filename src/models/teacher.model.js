import mongoose, { Schema } from "mongoose";


const teacherSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            trim: true
        },
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course" 
            }
        ]
    },
    { timestamps: true } 
);

// Export the Teacher model
export const Teacher = mongoose.model("Teacher", teacherSchema);
