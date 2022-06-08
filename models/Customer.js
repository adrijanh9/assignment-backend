const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	mail: String,
	city: String,
	birthdate: String,
});

module.exports = mongoose.model("Customer", schema);
