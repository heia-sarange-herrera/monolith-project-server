"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializedData = serializedData;
function serializedData(data) {
    const usernameFix = String(data).replace(/\s+/g, "").toLowerCase();
    return usernameFix;
}
