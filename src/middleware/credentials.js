const allowed = require('../config/allowed')

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowed.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials