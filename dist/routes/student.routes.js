"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const router = (0, express_1.Router)();
router.post("/", student_controller_1.studentController);
exports.default = router;
