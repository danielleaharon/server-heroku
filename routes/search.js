const express = require('express');
const searchController = require('../controllers/search')
var router = express.Router();


router.get('/searchUser/:search', searchController.searchUser);
router.get('/searchCalenderByDate/:search', searchController.searchCalenderByDate);
router.get('/searchCalenderbyCategory/:search', searchController.searchCalenderbyCategory);



module.exports = router;