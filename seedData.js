const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const Order = require('./models/Order');

const MONGO_URI = 'mongodb+srv://i222617:o7J9tY8Oc3VJIp9r@cluster0.gzgvcne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    await Order.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@aquanest.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@aquanest.com',
      password: userPassword,
      role: 'user'
    });

    // Create sample products
    const products = await Product.create([
      {
        name: 'Premium Water Filter',
        description: 'High-quality water filtration system',
        type: 'dispenser',
        size: 'Standard',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        category: 'Filters',
        stock: 50
      },
      {
        name: 'Smart Water Bottle',
        description: 'Reusable water bottle with temperature monitoring',
        type: 'bottle',
        size: '750ml',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        category: 'Bottles',
        stock: 100
      },
      {
        name: 'Water Purification Tablets',
        description: 'Emergency water purification tablets',
        type: 'bottle',
        size: '100 tablets',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        category: 'Purification',
        stock: 200
      },
      {
        name: 'Under Sink Filter System',
        description: 'Complete under-sink water filtration system',
        type: 'dispenser',
        size: 'Standard',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        category: 'Filters',
        stock: 25
      },
      {
        name: 'Portable Water Filter',
        description: 'Lightweight portable filter for camping and travel',
        type: 'bottle',
        size: '500ml',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        category: 'Portable',
        stock: 75
      }
    ]);

    // Create sample testimonials
    await Testimonial.create([
      {
        user: regularUser._id,
        text: 'Amazing water quality! The filter system works perfectly.',
        rating: 5
      },
      {
        user: regularUser._id,
        text: 'Great customer service and fast delivery.',
        rating: 4
      },
      {
        user: adminUser._id,
        text: 'The smart water bottle is fantastic. Love the temperature feature!',
        rating: 5
      },
      {
        user: adminUser._id,
        text: 'Excellent product quality and reasonable prices.',
        rating: 4
      }
    ]);

    // Create sample orders
    await Order.create([
      {
        user: regularUser._id,
        products: [
          { product: products[0]._id, quantity: 1 },
          { product: products[1]._id, quantity: 2 }
        ],
        total: products[0].price * 1 + products[1].price * 2,
        status: 'delivered'
      },
      {
        user: regularUser._id,
        products: [
          { product: products[2]._id, quantity: 3 }
        ],
        total: products[2].price * 3,
        status: 'pending'
      }
    ]);

    console.log('Sample data seeded successfully!');
    console.log('Admin user: admin@aquanest.com / admin123');
    console.log('Regular user: user@aquanest.com / user123');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData(); 