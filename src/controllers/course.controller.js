import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Teacher } from "../models/teacher.model.js";
import {Student} from "../models/student.model.js"


// Create a new course
export const createCourse = asyncHandler(async (req, res) => {
    const { courseName, courseCode } = req.body;

    const existingCourse = await Course.findOne({ courseCode: courseCode.trim() });
    if (existingCourse) {
        throw new ApiError(400, "Course with this code already exists");
    }

    const course = await Course.create({ courseName, courseCode });
    return res.status(201).json(new ApiResponse(201, "Course created successfully", course));
});

// Assign a teacher to a course or create a new course if it doesn't exist
export const assignTeacherToCourse = asyncHandler(async (req, res) => {
    const { courseCode, courseName, teacherName, teacherEmail } = req.body;

    // Validate inputs
    if (!courseCode || !courseName || !teacherName || !teacherEmail) {
        throw new ApiError(400, "Missing required fields");
    }

    // Find or create the teacher based on email
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
        // If teacher doesn't exist, create a new one
        teacher = await Teacher.create({ name: teacherName, email: teacherEmail });
    }

    // Find or create the course based on course code
    let course = await Course.findOne({ courseCode });
    if (!course) {
        // If course doesn't exist, create a new course
        course = await Course.create({ courseCode, courseName });
    }

    // Assign the teacher to the course if not already assigned
    if (!course.teacher || course.teacher.toString() !== teacher._id.toString()) {
        course.teacher = teacher._id;
        await course.save();
    }

    // Add the course to the teacher's courses array if not already present
    if (!teacher.courses.includes(course._id)) {
        teacher.courses.push(course._id);
        await teacher.save();
    }

    // Return success response with course and teacher info
    return res.status(200).json(new ApiResponse(200, "Teacher assigned to course successfully", { course, teacher }));
});



export const addStudentsToCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { students } = req.body; // Array of { name, rollNo }

    // Validate course ID
    if (!mongoose.isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course ID");
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Process each student
    for (const { name, rollNo } of students) {
        let student = await Student.findOne({ rollNo });

        // Create a new student if they don't exist
        if (!student) {
            student = await Student.create({
                name,
                rollNo,
                courses: [courseId],
            });
        } else {
            // Add the course to the student's courses array if not already present
            if (!student.courses.includes(courseId)) {
                student.courses.push(courseId);
                await student.save();
            }
        }

        // Add the student to the course's students array if not already present
        if (!course.students.includes(student._id)) {
            course.students.push(student._id);
            await course.save(); // Save course after adding student
        }
    }

    // Return the updated course and confirmation message
    return res
        .status(200)
        .json(new ApiResponse(200, "Students added to course successfully", course));
});
