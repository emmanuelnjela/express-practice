const data = {
    employees: require("../model/api/employees.json"),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployee = (req, res) => {
    res.json(data.employees);
}
const getEmployee = (req, res) => {
    const employee = data.employees.filter(emp => emp.id == parseInt(req.params.id));
    if(!employee){
        return req.status(400).json({"message": `User you try to edit not found, id = ${parseInt(req.params.id)}`});
    }
    res.json(employee);
}
const deleteEmployee = (req, res) => {
    const filtered = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filtered]);
    res.status(201).json(data.employees)
}
const updateEmployee = (req, res) => {
    const { id, name, age, specialist } = req.body;
    const employee = data.employees.find(emp => emp.id == parseInt(id));
    if(!employee){
        return req.status(400).json({"message": `User you try to edit not found, id = ${parseInt(id)}`});
    }
    if(name) employee.name = name
    if(age) employee.age = age
    if(specialist) employee.specialist = specialist
    console.log(employee)
    data.setEmployees([...data.employees, employee])
    res.status(201).json(data.employees);
}
const addNewEmployee = (req, res) => {
    const { name, age, specialist } = req.body;
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1,
        name,
        age,
        specialist
    }
    console.log(newEmployee)
    if(Array.from(req.body).includes(null || undefined)){
        return req.status(400).json({"message": "All data are required"})
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

module.exports = { getAllEmployee, getEmployee, addNewEmployee, deleteEmployee, updateEmployee }