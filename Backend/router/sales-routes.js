const express = require("express");
const app = express();
const sales = require("../controller/sales-controller");

// Add Sales
app.post("/add", sales.addSales);

// Get All Sales
app.get("/get/:userID", sales.getSalesData);
// app.get("/get/:userId", product.getAllProducts);
app.get("/getmonthly/:userID", sales.getMonthlySales);


app.get("/get/:userID/totalsaleamount", sales.getTotalSalesAmount);

module.exports = app;



// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
