const { pool } = require('../config');
const getProperty = (req, res) => {
    pool.query('SELECT * FROM properties', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}
const updateProperty = (req, res) => {
    const {
        id,
        name,
        address,
        city,
        state,
        zip,
        price,
        beds,
        baths,
        longitude,
        latitude,
        picture,
        thumbnail,
        broker,
        description
    } = req.body
    pool.query(`UPDATE properties SET name=$1,address=$2, city=$3, state=$4, zip=$5, price=$6, beds=$7, baths=$8, longitude=$9, latitude=$10, picture=$11,thumbnail=$12, broker=$13, description=$14 where id=$15`, [name, address, city, state, zip, price, beds, baths, longitude, latitude, picture, thumbnail, broker, description, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })


}
const addProperty = (req, res) => {
    const {
        name,
        address,
        city,
        state,
        zip,
        price,
        beds,
        baths,
        longitude,
        latitude,
        picture,
        thumbnail,
        broker,
        description
    } = req.body
    pool.query(
        'INSERT INTO properties (name,address,city,state,zip,price,beds,baths,longitude,latitude,picture,thumbnail,broker,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)', [name, address, city, state, zip, price, beds, baths, longitude, latitude, picture, thumbnail, broker, description],
        (error) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: 'Property added.' })
        }
    )
}
module.exports = {
    getProperty,
    addProperty,
    updateProperty
}