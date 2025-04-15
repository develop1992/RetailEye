/**
 * Converts boolean fields to string values for react-hook-form selects.
 * Defaults are provided for new record creation.
 *
 * @param {object|null|undefined} values - The initial values for the form
 * @param {object} defaults - Field-specific boolean defaults (e.g., { isActive: true })
 * @returns {object} A copy of the object with booleans stringified
 */
export function convertBooleansToStrings(values, defaults = {}) {
    const safe = values || {};

    const result = { ...safe };

    Object.keys(defaults).forEach((key) => {
        const value = safe[key];
        result[key] =
            value != null ? String(value) : String(defaults[key] ?? true); // fallback to default or true
    });

    return result;
}