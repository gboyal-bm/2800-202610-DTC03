/**
 * @fileoverview Helpers for unit conversions
 * @module utils/conversions
 * 
 * @description Defines helper functions for unit conversions.
 * @export daysToMilliseconds
 */

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

module.exports = {
    daysToMilliseconds
}
