const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const locals = {
        title: 'NodeJS',
        description: 'Free NodeJS user management system',
    };
    res.render('index', { locals });
});

module.exports = router;
