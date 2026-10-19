"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const title_controller_1 = require("../controllers/title.controller");
const router = (0, express_1.Router)();
router.post("/", title_controller_1.titleController);
exports.default = router;
