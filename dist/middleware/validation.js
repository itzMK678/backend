"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = validateRequiredFields;
function validateRequiredFields(fields) {
    return (req, res, next) => {
        const missing = fields.filter((f) => req.body?.[f] === undefined || req.body?.[f] === null || req.body?.[f] === "");
        if (missing.length > 0) {
            res.status(400).json({
                error: `Missing required field(s): ${missing.join(", ")}`,
            });
            return;
        }
        next();
    };
}
