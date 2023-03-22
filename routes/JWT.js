const { sign, verify } = require('jsonwebtoken')

const creatTokens = (emails) => {
    const accessToken = sign({ usersemail: emails.email, userspassword: emails.password }, "koderahasia");
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken)
        return res.status(400).json({ error: 'user not Authenticated!' })
    try {
        const validateToken = verify(accessToken, "koderahasia")
        if (validateToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(400).json({ error: err })
    }

}


module.exports = { creatTokens, validateToken }