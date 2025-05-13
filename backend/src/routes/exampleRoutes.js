const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Example routec !222!!');
});

module.exports = router;
