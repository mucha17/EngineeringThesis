const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const bodyParser = require('body-parser');
const cors = require('cors');

const cityRoutes = require("./routes/city");

require("./config/database")

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', cityRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;
