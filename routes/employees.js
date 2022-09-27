const express = require("express");
const router = express.Router();
const employeesController = require("../controller/employeesController")


router.route('/')
    .get(employeesController.getAllEmployee)
    .post(employeesController.addNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router