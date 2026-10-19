"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.researchController = researchController;
const research_service_1 = require("../services/research.service");
async function researchController(req, res, next) {
    try {
        const result = await (0, research_service_1.executeResearchSynthesis)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
