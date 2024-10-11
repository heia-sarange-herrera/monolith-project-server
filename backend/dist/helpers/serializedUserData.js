"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializedData = serializedData;
/**
 *  changed the string data into lowercase and contained it in a temporary variable that the function returns.
 */
function serializedData(data) {
    const usernameFix = String(data).replace(/\s+/g, "").toLowerCase();
    return usernameFix;
}
