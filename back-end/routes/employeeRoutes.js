const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const protect = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(protect, createEmployee)
  .get(protect, getEmployees);

router.route('/:id')
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
