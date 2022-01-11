const axios = require('axios');

const BASE_URL_SEARCH = 'https://api.github.com/search'

exports.getRepos = async (req, res, next) => {
    const queryString = Object.keys(req.query).reduce((s, key) => {
        if (s === '') s = `${s}${key}=${req.query[key]}`;
        s = `${s}&${key}=${req.query[key]}`;

        return s;
    }, '');

    try {
        if (queryString === '') throw Error('query string required');

        const response = await axios.get(`${BASE_URL_SEARCH}/repositories?${queryString}`);

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};



