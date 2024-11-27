const Sales = require("../models/Sales");
const soldStock = require("./soldStock-controller.js");

const addSales = async (req, res) => {
  try {
    const { userID, productID, storeID, stockSold, saleDate, totalSaleAmount } = req.body;

    if (!userID || !productID || !storeID || !stockSold || !saleDate || !totalSaleAmount) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const addSale = new Sales({
      userID,
      productID,
      storeID,
      stockSold,
      saleDate,
      totalSaleAmount,
    });

    const result = await addSale.save();
    await soldStock(productID, stockSold);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error adding sale:", err.message);
    res.status(500).send({ error: "Server error", details: err.message });
  }
};


// Get All Sales Data
const getSalesData = async (req, res) => {
  try {
    
    // Fetch all sales data for the user
    const findAllSalesData = await Sales.find({ userID: req.params.userID })
    .sort({ _id: -1 })
    .populate("productID")
    .populate("storeID");

    // console.log("populate data is ",findAllSalesData)


    // Log the fetched sales data
    // console.log("Sale data is: ", findAllSalesData);

    // Send the sales data as a JSON response
    res.status(200).json(findAllSalesData);
  } catch (err) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get Total Sales Amount
const getTotalSalesAmount = async (req, res) => {
  try {
    const salesData = await Sales.find({ userID: req.params.userID });
    const totalSaleAmount = salesData.reduce((sum, sale) => {
      // Ensure TotalSaleAmount is treated as a number
      const amount = Number(sale.totalSaleAmount) || 0;
      return sum + amount;
    }, 0);
    // console.log("totalSaleAmount is ", totalSaleAmount);


    res.status(200).json({ totalSaleAmount });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get Monthly Sales
const getMonthlySales = async (req, res) => {
  try {
    // console.log("use is sds", req.params.userID )

    const sales = await Sales.find({ userID: req.params.userID })
    // console.log("sale data is ",sales);

  
    // Initialize array with 12 zeros
    const salesAmount = Array(12).fill(0);
    
    sales.forEach((sale) => {
      
      const monthIndex = new Date(sale.saleDate).getMonth();
      salesAmount[monthIndex] += sale.totalSaleAmount;
    });
  
    // console.log("sale amount is ", salesAmount);
  
    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

module.exports = { addSales, getMonthlySales, getSalesData, getTotalSalesAmount };
