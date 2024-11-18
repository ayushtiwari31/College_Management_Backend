import express from "express";

import {createBranch ,addStudentsToBranchByCode} from "../controllers/branch.controller.js";

const router = express.Router();

router.post("",createBranch);
router.post("/students",addStudentsToBranchByCode);


export default router;