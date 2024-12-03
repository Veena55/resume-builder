const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(function () {
        console.log("Database Connected Successfully!");
    }).catch(function (err) {
        console.log(process.env.NODE);
        console.log(err, "no");
    });

module.exports = mongoose.connection;