const express = require('express');
const db = require('./Database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
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