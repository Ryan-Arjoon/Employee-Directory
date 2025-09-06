const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  try {
    const { name, position, salary, startDate, employeeId } = req.body;
    const company = req.user.company;

    const existing = await Employee.findOne({ employeeId });
    if (existing) return res.status(400).json({ message: 'Employee ID already exists' });

    const employee = await Employee.create({ name, position, salary, startDate, employeeId, company });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const company = req.user.company;
    const employees = await Employee.find({ company });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id, company: req.user.company });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    if (req.body.employeeId && req.body.employeeId !== req.params.id) {
      const existing = await Employee.findOne({ employeeId: req.body.employeeId, company: req.user.company });
      if (existing) {
        return res.status(400).json({ message: 'Employee ID already exists' });
      }
    }

    Object.assign(employee, req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id, company: req.user.company });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };