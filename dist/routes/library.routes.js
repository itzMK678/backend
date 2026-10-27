"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const library_controller_1 = require("../controllers/library.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected Knowledge Library routes: user must be logged in
router.get("/", auth_middleware_1.requireAuth, library_controller_1.getLibraryController);
router.post("/", auth_middleware_1.requireAuth, library_controller_1.saveLibraryController);
router.delete("/:id", auth_middleware_1.requireAuth, library_controller_1.deleteLibraryController);
router.post("/search", auth_middleware_1.requireAuth, library_controller_1.searchLibraryController);
exports.default = router;
