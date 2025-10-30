import express from "express";
const app = express();
app.use(express.json())

import employees from "./db/employees.js";
import employeeRouter from "./routes/employeesRouter.js";

app.use("/employees", employeeRouter); // something needs to be done here 

app.use("/",(req,res, next) => {
  res.send("Hello employees!")
}); 

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use((err, req ,res, next) => {

  console.error(err)
  res.status(500).send({error: err, message: "Error occurred!" }); 

}); 



export default app;