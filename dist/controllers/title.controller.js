"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleController = titleController;
const title_service_1 = require("../services/title.service");
async function titleController(req, res, next) {
    try {
        const prompt = req.body.prompt || req.body.firstMessage;
        const result = await (0, title_service_1.generateConversationTitle)(prompt);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
