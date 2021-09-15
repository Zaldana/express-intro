const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log(`Server is now running on PORT: ${PORT}`);
});