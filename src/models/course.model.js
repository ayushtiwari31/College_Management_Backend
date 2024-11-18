import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true
        },
        courseCode: {
            type: String,
            required: true,
            unique: true, 
            trim: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher", 
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" 
            }
        ],
        tests: [
            {
                type: Schema.Types.ObjectId,
                ref: "Test"
            }
        ]
    },
    { timestamps: true } 
);


export const Course = mongoose.model("Course", courseSchema);
