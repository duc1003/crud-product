import express from 'express';
import {connect} from './config/connect.js';
import productRoute from './routes/product.routes.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us  to accept JSON data into the req.boy

// route
app.get('/', (req, res) => {
    res.send("Server is ready");
});

app.use('/api/products', productRoute);



app.listen(PORT, () => {
    connect();
    console.log(`Server started at http://localhost:${PORT}`);
});
