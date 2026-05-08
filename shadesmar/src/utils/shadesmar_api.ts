/**
 * @fileoverview Utilities for interacting with the Shadesmar API
 * @module utils/shadesmar_api
 * 
 * @description Provides functions to interact with the Shadesmar API, abstracting the process
 *              of fetching data and automatic redirects.
 * @exports apiFetch
 * @exports getUser
 * 
 * @author Alex Lu
 */

/**
 * @typedef {Object} ApiResponse
 * @description The formatted JSON response.
 * @property {number | null} status - The HTTP status code, or null if there was an error
 * @property {Object | null} result - The JSON response body, or null if there was an error
 */
type ApiResponse = {
    status: number | null,
    result: Object | null
}

/**
 * @function apiFetch
 * @description Wraps fetch to add custom handling of statuses in requests.
 * 
 * @param {string} endpoint - The API endpoint path, such as "/auth/me"
 * @param {Object} options  - Additional options to pass into the request, including the method and body
 * @returns {Promise<ApiResponse>} - The formatted JSON response
 */
async function apiFetch(endpoint: string, options: Object = {}) {
    let result: Object | null = null;
    let status: number | null = null;
    try {
        const response = await fetch(
            `/api${endpoint}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                ...options
            }
        );
        status = response.status;
        result = await response.json();
    } catch (err) {
        console.error("Shadesmar API Fetch Error:", err);
        status = 500;
    } finally {
        // Unauthorized requests redirect to login
        if (status == 401) {
            window.location.href = "/login";
        }
        const apiResponse: ApiResponse = { status, result };
        return apiResponse;
    }
}

/**
 * @function getUser
 * @description Fetches the currently logged in user's information.
 * 
 * @returns {Promise<Object>} - The formatted JSON response, or null if no user is logged in
 */
async function getUser() {
    let user: Object | null = null;
    try {
        const response = await apiFetch("/auth/me");
        if (response.status === 200) {
            user = response.result;
        }
    } catch (err) {
        console.error("Error fetching user information:", err);
    } finally {
        return user;
    }
}


export const ShadesmarApi = {
    apiFetch,
    getUser
}
