const connectDb = require('./db');
connectDb();
const express = require('express')
const cors = require('cors');

const app = express();

const port = 7000
app.use(cors({
  origin: '*'
}));
app.use(express.json());


//admin => add property
app.use('/api/admin', require('./routes/admin'));

//home => get property
app.use('/api/home', require('./routes/home'))

//Filter =>
app.use('/api/filters', require('./routes/filters'));

//Comp
app.use('/api/comp',require('./routes/comp'))





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

