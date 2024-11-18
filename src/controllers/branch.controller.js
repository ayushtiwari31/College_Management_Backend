import { Branch } from "../models/branch.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createBranch = asyncHandler(async (req, res) => {
    const { branch, year, departmentId } = req.body;

    // Check if branch with the same year already exists
    const existingBranch = await Branch.findOne({ year });
    if (existingBranch) {
        throw new ApiError(400, "Branch with this year already exists");
    }

    // Create the new branch
    const newBranch = await Branch.create({ branch, year });

    // Find the department and add the branch ID to its branches array
    const department = await Department.findById(departmentId);
    if (!department) {
        throw new ApiError(404, "Department not found");
    }

    department.branches.push(newBranch._id);
    await department.save();

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Branch created successfully and added to department", {
                branch: newBranch,
                department,
            })
        );
});

// export const addStudentsToBranch = asyncHandler(async (req, res) => {
//     const { branchId } = req.params; // Branch ID from URL params
//     const studentsData = req.body; // Array of students data

//     // Check if the data is an array
//     if (!Array.isArray(studentsData) || studentsData.length === 0) {
//         throw new ApiError(400, "Invalid input: Array of students is required");
//     }

//     // Find the branch by ID
//     const branch = await Branch.findById(branchId);
//     if (!branch) {
//         throw new ApiError(404, "Branch not found");
//     }

//     // Process each student in the array
//     const createdStudents = [];
//     for (const studentData of studentsData) {
//         const { name, rollNo, department, gender, year, yearOfJoining } = studentData;

//         // Create a new student
//         const student = await Student.create({
//             name,
//             rollNo,
//             department,
//             gender,
//             year,
//             yearOfJoining,
//         });

//         // Add the student ID to the branch's students array
//         branch.students.push(student._id);
//         createdStudents.push(student);
//     }

//     // Save the updated branch
//     await branch.save();

//     return res
//         .status(201)
//         .json(
//             new ApiResponse(201, "Students added to branch successfully", {
//                 branch,
//                 createdStudents,
//             })
//         );
// });


export const addStudentsToBranchByCode = asyncHandler(async (req, res) => {
    const { branchCode } = req.params; // Branch code from URL params
    const studentsData = req.body; // Array of students data

    // Check if the data is an array
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
        throw new ApiError(400, "Invalid input: Array of students is required");
    }

    // Find the branch by its code
    const branch = await Branch.findOne({ branch: branchCode.trim() });
    if (!branch) {
        throw new ApiError(404, "Branch not found with the given code");
    }

    // Process each student in the array
    const createdStudents = [];
    for (const studentData of studentsData) {
        const { name, rollNo, department, gender, year, yearOfJoining } = studentData;

        // Create a new student
        const student = await Student.create({
            name,
            rollNo,
            department,
            gender,
            year,
            yearOfJoining,
        });

        // Add the student ID to the branch's students array
        branch.students.push(student._id);
        createdStudents.push(student);
    }

    // Save the updated branch
    await branch.save();

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Students added to branch successfully", {
                branch,
                createdStudents,
            })
        );
});
