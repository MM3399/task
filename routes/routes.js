const express = require('express');

const toDoController = require('../controllers/toDoController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', toDoController.getList);

router.post('/',toDoController.saveList);

router.put('/',toDoController.updateList);

router.delete('/:id', toDoController.deleteList);

router.post('/admin', adminController.adminAuthorization);

router.post('/signup', adminController.newAdmin);

module.exports = router