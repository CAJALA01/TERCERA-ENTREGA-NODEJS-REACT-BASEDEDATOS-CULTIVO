const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const checkToken = (req, res, next) => {
    const token = req.header('authorization')
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token No Reconocido' })
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.SecretToken)
        req.user = verifiedUser
        next(); // continuamos
    } catch (error) {
        res.status(400).json({ error: 'Revisar token' })
    }
}

module.exports = {
    checkToken
};