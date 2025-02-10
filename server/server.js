const express = require('express');
const db = require('./Database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const redis = require('redis');
const {RedisStore} = require('connect-redis'); 
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
const registerRoutes = require('./routes/Account/AccountRegistration/registerRoutes');
const loginRoutes = require('./routes/Account/AccountLogin/loginRoutes');
const AdminRoutes = require('./routes/Admin/AdminRoute');
const productRoutes = require('./routes/Products/ProductRoutes');
const cartRoutes = require('./routes/Cart/cartRoutes');


// Cors setup
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))



// app.use(session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         httpOnly: true,
//         maxAge: 7 * 24 * 60 * 60 * 1000
//     }
// }))

// Redis connection (for future use)

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

if(redisClient.isOpen){
    console.log("Redis connected");
}
else{
    console.log("Redis not connected");
}

// Redis store for session management

let redisStore = new RedisStore({
    client: redisClient
})

app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))

app.use('/v1/account', registerRoutes);
app.use('/v1/account', loginRoutes);
app.use('/v1/admin', AdminRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/cart', cartRoutes);


app.get('/', (req, res) => {
    res.send('Server is uup and running');
});
app.listen(process.env.PORT || 3000,  () => {
db().then(() => {
//  db is a database connection function,  you can replace it with your own database connection function
console.log('Database connected');
}).catch((err) => {
console.log(err);
});
console.log(`Server running on port ${process.env.PORT || 3000}`);
});