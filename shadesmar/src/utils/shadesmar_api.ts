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
 * @typedef {object} ApiResponse
 * @description The formatted JSON response.
 * @property {number | null} status - The HTTP status code, or null if there was an error
 * @property {object | null} result - The JSON response body, or null if there was an error
 * @property {boolean} ok - Whether the response status is in the range 200-299
 */
type ApiResponse = {
    status: number | null;
    result: object | null;
    ok: boolean;
};

/**
 * @function responseOk
 * @description Checks if a given HTTP status code is in the range 200-299, indicating a successful response.
 * 
 * @param {number} status - The HTTP status code to check
 * @returns {boolean} - Whether the status code represents a successful response
 */
function responseOk(status: number): boolean {
    return status >= 200 && status < 300;
}

/**
 * @function apiFetch
 * @description Wraps fetch to add custom handling of statuses in requests.
 *
 * @param {string} endpoint - The API endpoint path, such as "/auth/me"
 * @param {object} options  - Additional options to pass into the request, including the method and body
 * @returns {Promise<ApiResponse>} - The formatted JSON response
 */
async function apiFetch(
    endpoint: string,
    options: object = {},
    noRedirect: boolean = false
): Promise<ApiResponse> {
    let result: object | null = null;
    let status: number | null = null;
    try {
        const response = await fetch(`/api${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
            },
            // Required so the browser sends and stores session cookies
            credentials: "include",
            ...options,
        });
        status = response.status;
        result = await response.json();
    } catch (err) {
        console.error("Shadesmar API Fetch Error:", err);
        status = 500;
    } finally {
        // Unauthorized requests redirect to login
        if (status == 401 && !noRedirect) {
            window.location.replace("/login");
        }
        const apiResponse: ApiResponse = { status, result, ok: responseOk(status as number) };
        return apiResponse;
    }
}

/**
 * @function getUser
 * @description Fetches the currently logged in user's information.
 *
 * @returns {Promise<Object | null>} - The formatted JSON response, or null if no user is logged in
 */
async function getUser(): Promise<object | null> {
    let user: Object | null = null;
    try {
        const response = await apiFetch("/auth/me", {}, true);
        if (response.ok) {
            user = response.result;
        }
    } catch (err) {
        console.error("Error fetching user information:", err);
    } finally {
        return user;
    }
}

/**
 * @function logoutUser
 * @description Logs out the currently logged in user.
 *
 * @returns {Promise<Object>} - The formatted JSON response, or null if no user is logged in
 */
async function logoutUser(): Promise<object | null> {
    let response: ApiResponse | null = null;
    try {
        response = await apiFetch("/auth/logout", { method: "POST" });
        if (response.ok) {
            console.log("User logged out successfully");
        }
    } catch (err) {
        console.error("Error logging out user:", err);
    } finally {
        return response;
    }
}

export const ShadesmarApi = {
    apiFetch,
    getUser,
    logoutUser
};
