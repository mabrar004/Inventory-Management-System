const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Store =  require('./models/Store')

 // Adjust the path as needed

const uri = "mongodb+srv://bakarbro123:Ci4dd7ENsHG69aB@cluster0.iymtagb.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const seedDatabase = async () => {
  try {
    const userId = new ObjectId(); // Replace with a valid user ID from your 'users' collection if available
    console.log("user id is ",userId)

    // Sample Stores
    const stores = [
      {
        userId: userId,
        name: 'Tech Store',
        category: 'Electronics',
        address: '123 Tech Avenue',
        city: 'Tech City',
        image: 'https://example.com/image1.jpg', // Replace with an actual image URL
      },
      {
        userId: userId,
        name: 'Grocery Hub',
        category: 'Groceries',
        address: '456 Food Street',
        city: 'Grocery Town',
        image: 'https://example.com/image2.jpg', // Replace with an actual image URL
      },
      {
        userId: userId,
        name: 'Wholesale Market',
        category: 'Wholesale',
        address: '789 Wholesale Blvd',
        city: 'Market City',
        image: 'https://example.com/image3.jpg', // Replace with an actual image URL
      },
      {
        userId: userId,
        name: 'SuperMart',
        category: 'SuperMart',
        address: '101 SuperMart Drive',
        city: 'Mart City',
        image: 'https://example.com/image4.jpg', // Replace with an actual image URL
      },
      {
        userId: userId,
        name: 'Phone World',
        category: 'Phones',
        address: '202 Phone Plaza',
        city: 'Phone City',
        image: 'https://example.com/image5.jpg', // Replace with an actual image URL
      },
    ];

    // Insert Stores
    await Store.insertMany(stores);
    console.log('Stores added successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database', error);
    mongoose.connection.close();
  }
};
