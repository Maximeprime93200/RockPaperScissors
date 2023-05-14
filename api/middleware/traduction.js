function traduction(i18n){
    return (req, res, next) => {
        let lang = req.query.lang;
        if (lang) {
            i18n.setLocale(lang);
        } else {
            lang = i18n.getLocale();
        }

        res.locals.__ = res.__ = function () {
            return i18n.t.apply(i18n, arguments);
        };

        next();
    }
}

module.exports = traduction;