/**
 * @fileoverview Helpers for unit conversions
 * @module utils/conversions
 *
 * @description Defines helper functions for unit conversions.
 * @export daysToMilliseconds
 */

/**
 * @function daysToMilliseconds
 *
 * @description Converts days to milliseconds. This is useful for setting cookie expiration times.
 * @param {number} days - The number of days to convert.
 * @returns {number} The equivalent number of milliseconds.
 */
function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

module.exports = {
    daysToMilliseconds,
};
