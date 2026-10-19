"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorMiddleware = errorMiddleware;
function errorMiddleware(error, _req, res, _next) {
    console.error("[Error Handler]", error?.message || error);
    let statusCode = error?.statusCode || 500;
    if (statusCode >= 502 && statusCode <= 504)
        statusCode = 500;
    res.status(statusCode).json({
        error: error?.message || "Internal server error",
        isConfigError: Boolean(error?.isConfigError),
    });
}
exports.errorHandler = errorMiddleware;
