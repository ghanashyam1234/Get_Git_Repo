const express = require('express');
const { getRepos } = require('../controllers/repos');

const router = express.Router();

router.route('/repos').get(getRepos);
router.route('/repos/:id').get(getRepos);
router.route('/');

module.exports = router;
