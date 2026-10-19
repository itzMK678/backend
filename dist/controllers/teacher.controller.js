"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherController = teacherController;
const teacher_service_1 = require("../services/teacher.service");
async function teacherController(req, res, next) {
    try {
        const result = await (0, teacher_service_1.generateTeacherResource)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
