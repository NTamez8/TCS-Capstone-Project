const serverConfig = require('./config/serverConfig');
const mongooseConfig = require('./config/dbConfig');

const adminRoutes = require('./routes/adminRoute');
const employeeRoutes = require('./routes/employeeRoute');
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const requestRoutes = require('./routes/requestRoute');
const ticketRoutes = require('./routes/ticketRoute');
const userRoutes = require('./routes/userRoute');

const errorHandler = require('./middleware/errorHandler');
const adminAuth = require('./middleware/adminPassport')();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
app.use(adminAuth.initialize());


mongoose.Promise = global.Promise;

mongoose.connect(mongooseConfig.url,mongooseConfig.options);


app.use('/admin',adminRoutes);

app.use('/employee',employeeRoutes);

app.use('/order',orderRoutes);

app.use('/product',productRoutes);

app.use('/request',requestRoutes);

app.use('/ticket',ticketRoutes);

app.use('/user',userRoutes);


app.use(errorHandler);


app.listen(serverConfig.port,()=>console.log(`listening on port ${serverConfig.port}`));

module.exports = app;