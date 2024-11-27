const Store = require("../models/Store");

// Add Store
const addStore = async (req, res) => {
  try {
    console.log(req.body);

    // Validate required fields
    const { userId, name, category, address, city, image } = req.body; 

    // if (!userId || !name || !category || !address || !city || !image) {
    //   return res.status(400).send({ error: "All fields are required" });
    // }

    const newStore = new Store({
      userID: userId,
      name,
      category,
      address,
      city,
      image,
    });


    newStore.save().then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(402).send(err);
    })
    // const result = await newStore.save();
    // res.status(200).send(result);


     // addProduct
    // .save()
    // .then((result) => {
    //   res.status(200).send(result);
    // })
    // .catch((err) => {
    //   res.status(402).send(err);
    // });

    
  } catch (err) {
    console.error("Error adding store:", err.message);
    res.status(500).send({ error: "Server error", details: err.message });
  }
};


// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 });
  
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores };
