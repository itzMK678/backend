"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const research_controller_1 = require("../controllers/research.controller");
const router = (0, express_1.Router)();
router.post("/", research_controller_1.researchController);
exports.default = router;
