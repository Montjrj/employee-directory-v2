import express from "express"; 
import employees from "#db/employees";


const router = express.Router(); 

router.use(express.json ()); 

console.log(employees)

router.get("/", (req, res) => {
    res.send(employees);
})
.post((req,res) => {
    if(!req.body){
        return res.status(400).send("Request must have a body."); 
    }
    const newEmployees = addEmployees(req.body); 
    res.status(201).send(newEmployees); 


}); 

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id); 
    
    // req.params are always strings, so we need to convert `id` into a number
    // before we can use it to find the employee
    const employee = employees.find((e) => e.id === +id);
    
    if (!employee) {
        return res.status(404).send("Employee not found");
    }
    
    res.send(employee);
});
export default router; 