"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examPrepController = examPrepController;
const exam_prep_service_1 = require("../services/exam-prep.service");
async function examPrepController(req, res, next) {
    try {
        const result = await (0, exam_prep_service_1.generateExamPreparation)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
