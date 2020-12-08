const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

server.listen(3000);

const employees = []; //[{fName: "Matt", lName: "Sugu", email: "matt.s@amazon.com", role: "sde", eId: "123432"}]

server.post("/employees", (req, res) => {
  employees.push(req.body);
  res.send(employees);
});

//route to return list of all employees
server.get("/employees", (req, res) => {
  res.send(employees);
})

//route to return employees by role
server.get("/employees/:role", (req, res) => {
  const role = req.params.role;
  const results = employees.filter(employee => employee.role.toUpperCase() === role.toUpperCase());

  res.send(results);
})

//route to return employees by id
server.get("/employees/:id", (req, res) => {
  const eId = req.params.id;
  const results = employees.filter(emp => emp.eId === eId);

  res.send(results);
})

//route to change employees information by id
server.put("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  let result = employees.filter(emp => emp.eId === id)
  if (employee.fName !== undefined) {
    result[0].fName = employee.fName;
  }
  if (employee.lName !== undefined) {
    result[0].lName = employee.lName;
  }
  if (employee.email !== undefined) {
    result[0].email = employee.email;
  }
  if (employee.role !== undefined) {
    result[0].role = employee.role;
  }
  res.send(result[0]);
})

//route to delete employees by id
server.delete("/employees/:id", (req, res) => {
  const id = req.params.id;
  let empIdx = -1;
  employees.map((emp, idx) => {
    if (emp.eId === id) {
      //if true, found emp to delete
      empIdx = idx;
      return;
    }
  })
  if (empIdx === -1) {
    return res.status(404).send("Employee not found");
  }
  employees.splice(empIdx, 1);
  res.send({success: "Success"});
})