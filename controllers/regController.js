const { pool } = require('../config');
const jwt = require('jsonwebtoken')

const jwtlogin = (req, res) => {
    const email = req.body.email;
    pool.query(`SELECT * FROM profile WHERE email=$1`, [email], (error, results) => {
        if (error) {
            throw error;
        }
        const user = { email: email }
        const accessToken = jwt.sign(results.rows, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken: accessToken })
    })

}

const login = (req, res) => {
    pool.query('SELECT * FROM profile', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const register = (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body
    pool.query(
        'INSERT INTO profile (firstname,lastname,email,password) VALUES ($1,$2,$3,$4)', [firstname, lastname, email, password],
        (error) => {
            res.status(400).json({ status: 'Error', message: 'User Added.' })
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: 'User Added' })
        }
    )
}
module.exports = {
    login,
    register,
    jwtlogin
}