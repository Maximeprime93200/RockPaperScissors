const express = require('express');
const router = express.Router();

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

router.use((req, res, next) => {
    const version = req.headers['accept-version'];
    if (version === '1.0') {
        v1Routes(req, res, next);
    } else if (version === '2.0') {
        v2Routes(req, res, next);
    } else {
        const error = new Error('API version not supported');
        error.status = 400;
        next(error);
    }
});

module.exports = router;