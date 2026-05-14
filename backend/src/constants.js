module.exports = {
    SALT_ROUNDS: 10,
    PASSWORD_MIN_LENGTH: 8,

    SESSION_NAME: "connect.sid",
    REMEMBER_ME_COOKIE_AGE: 30, // Days

    VALID_EMAIL_REGEX: /^\S+@\S+\.\S+$/,

    DEFAULT_THEME: "light",
    THEME_OPTIONS: ["light", "dark"],

    TOURS_TRACKER: {
        home: false,
        explore: false,
        profile: false,
    }
}