const i18n = require("i18next");
const path = require("path");

i18n.configure({
    locales: ["en", "fr"],
    directory: path.join(__dirname, "locales"),
    defaultLocale: "en",
    quertParameter: "lang",
});

function i18nMiddleware(req, res, next) {
    i18n.init(req.res);
    res.locals.__ = res.__ = function () {
        return i18n.t.apply(i18n, arguments);
    };
    next();
}

module.exports = i18nMiddleware;