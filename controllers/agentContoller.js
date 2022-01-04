const { pool } = require('../config');
const getAgent = (req, res) => {
    pool.query('SELECT * FROM agents', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const updateAgent = (req, res) => {
    const {
        id,
        name,
        title,
        phone,
        mobile,
        email,
        picture
    } = req.body
    pool.query(`UPDATE agents() SET name=$2,title=$3,phone=$4,mobile=$5,email=$6,picture=$7 where id=$1`, [id, name, title, phone, mobile, email, picture], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })


}
const addAgent = (req, res) => {
    const {
        name,
        title,
        phone,
        mobile,
        email,
        picture
    } = req.body
    pool.query(
        'INSERT INTO agents (name,title,phone,mobile,email,picture) VALUES ($1,$2,$3,$4,$5,$6)', [name, title, phone, mobile, email, picture,],
        (error) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: 'Agent added.' })
        }
    )
}
module.exports = {
    getAgent,
    addAgent,
    updateAgent
}