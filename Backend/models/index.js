const mongoose = require("mongoose");
const uri = "mongodb+srv://bakarbro123:RcLQXHccPxXrXGq4@cluster0.iymtagb.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority&appName=Cluster0";


const main = () => {
    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = { main };