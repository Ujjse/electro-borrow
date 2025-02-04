// // imports
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDatabase = require('./database/database')
// const acceptFormData = require('express-fileupload')
// const path = require('path');
// const cors = require('cors');




// // creating express app
// const app= express();

// // dotenv configuration
// dotenv.config()

// connectDatabase()
// app.use(acceptFormData())
// app.use(express.json())

// const CorsOptions = {
//     origin: true,
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(CorsOptions))

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, 'public')));





// const PORT= process.env.PORT;

// app.get('/test', (req, res) => {
//     res.send("Test API is working!...")
// })

// app.use('/api/user', require('./routes/userRoutes'))
// app.use('/api/product', require('./routes/productRoutes'))
// app.use('/api/order', require('./routes/orderRoutes'))
// app.use('/api/payment', require('./routes/payment'))


// app.listen(PORT, () => {
//     console.log(`Server running on PORT ${PORT}!`) // making dynamic using `` instead of "" // stop by Ctrl+C
    
// })


// module.exports= connectDatabase();
// module.exports = app


const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const acceptFormData = require('express-fileupload');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// MongoDB Connection Function
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_LOCAL)
        .then(() => {
            console.log("Database Connected!");
        })
        .catch((error) => {
            console.error("Database Connection Failed:", error.message);
            process.exit(1); // Exit process with failure
        });
};

// Initialize Express App
const app = express();

// Middleware
app.use(acceptFormData());
app.use(express.json());

// CORS Configuration
const CorsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(CorsOptions));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDatabase();

// Define Routes
app.get('/test', (req, res) => {
    res.send("Test API is working!");
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/payment'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}!`);
});

// Export the app (if needed for testing or further use)
module.exports = app;
