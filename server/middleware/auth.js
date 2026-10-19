
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token required'
        })
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: 'Authentication is not configured'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.userId) {
            return res.status(401).json({
                message: 'Invalid authentication token'
            })
        }

        req.userId = decoded.userId
        next()
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token'
        })
    }
}

module.exports = authenticateToken
