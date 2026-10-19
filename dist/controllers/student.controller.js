"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = studentController;
const student_service_1 = require("../services/student.service");
async function studentController(req, res, next) {
    try {
        const result = await (0, student_service_1.generateStudentResource)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
