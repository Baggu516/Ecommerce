// ✅ This script adds 20 clothing products with images to MongoDB

const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

const products = [
  {
  name: "Red T-shirt",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
    price: 499,
    rating: 4.2
},
  {
    name: "Blue Jeans",
    image: "https://images.unsplash.com/photo-1580316016311-3d5c2b858332?w=500",
    price: 1299,
    rating: 4.5
  },
  {
    name: "White Saree",
    image: "https://images.unsplash.com/photo-1580910051073-e9d46d1f3fda?w=500",
    price: 1999,
    rating: 4.8
  },
  {
    name: "Black Hoodie",
    image: "https://images.unsplash.com/photo-1585386959984-a4155223baf0?w=500",
    price: 999,
    rating: 4.6
  },
  {
    name: "Floral Dress",
    image: "https://images.unsplash.com/photo-1589782182363-8d1b2f34877e?w=500",
    price: 1499,
    rating: 4.7
  },
  {
    name: "Casual Kurta",
    image: "https://images.unsplash.com/photo-1591348278419-4e04a2eeebc5?w=500",
    price: 799,
    rating: 4.3
  },
  {
    name: "Formal Shirt",
    image: "https://images.unsplash.com/photo-1530032531987-53dcfb4f9316?w=500",
    price: 899,
    rating: 4.1
  },
  {
    name: "Denim Jacket",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500",
    price: 1499,
    rating: 4.4
  },
  {
    name: "Printed Skirt",
    image: "https://images.unsplash.com/photo-1629622140090-93453c2ffed5?w=500",
    price: 699,
    rating: 4.0
  },
  {
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1607522370275-3592b0b7c6e8?w=500",
    price: 1699,
    rating: 4.6
  },
  {
    name: "Graphic T-shirt",
    image: "https://images.unsplash.com/photo-1520974735194-3f7d6b3cb7b7?w=500",
    price: 599,
    rating: 4.2
  },
  {
    name: "Kurti Set",
    image: "https://images.unsplash.com/photo-1632583246977-3b33f3c7b8fa?w=500",
    price: 1399,
    rating: 4.5
  },
  {
    name: "Anarkali Dress",
    image: "https://images.unsplash.com/photo-1627061031983-4036baef12c7?w=500",
    price: 1899,
    rating: 4.7
  },
  {
    name: "Maxi Dress",
    image: "https://images.unsplash.com/photo-1619983081563-d7a2d12a6b8c?w=500",
    price: 1599,
    rating: 4.4
  },
  {
    name: "Joggers",
    image: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=500",
    price: 799,
    rating: 4.3
  },
  {
    name: "Lehenga",
    image: "https://images.unsplash.com/photo-1622482273553-159ab17666eb?w=500",
    price: 2499,
    rating: 4.9
  },
  {
    name: "Party Gown",
    image: "https://images.unsplash.com/photo-1581349481749-fb5b0b7420ec?w=500",
    price: 2199,
    rating: 4.6
  },
  {
    name: "Blue Kurta",
    image: "https://images.unsplash.com/photo-1563213126-a312ef1b2dc6?w=500",
    price: 899,
    rating: 4.4
  },
  {
    name: "Track Pants",
    image: "https://images.unsplash.com/photo-1584772931856-38d6fa7d80b8?w=500",
    price: 699,
    rating: 4.2
  },
  {
    name: "Winter Coat",
    image: "https://images.unsplash.com/photo-1589998059171-013bcb4c43c5?w=500",
    price: 1999,
    rating: 4.8
  }
];

const seedProducts = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
 
  mongoose.disconnect();
};

seedProducts();
