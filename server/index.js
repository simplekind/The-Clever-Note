require('dotenv').config();
const express = require('express');
const app = express();
bodyParser = require('body-parser');
cors = require('cors');
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

require(`${__dirname}/app/routes`)(app);

app.listen(port,()=>{
    console.log('listening on port '+ port);
})