"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examPrep_controller_1 = require("../controllers/examPrep.controller");
const router = (0, express_1.Router)();
router.post("/", examPrep_controller_1.examPrepController);
exports.default = router;
