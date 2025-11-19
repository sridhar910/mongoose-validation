function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ error: errors });
    }

    if (err.code === 11000) {
        return res.status(409).json({ error: 'Duplicate email detected' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;