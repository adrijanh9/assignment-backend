const express = require("express");
const Customer = require("./models/Customer");
const insurance = require("./insurance");
const router = express.Router();

router.get("/customers", async (req, res) => {
	const customers = await Customer.find();
	res.send(customers);
});

router.post("/customers", async (req, res) => {
	const customer = new Customer({
		_id: req.body._id,
		name: req.body.name,
		mail: req.body.mail,
		city: req.body.city,
		birthdate: req.body.birthdate,
	});
	await customer.save();
	res.send(customer);
});

router.get("/customers/:id", async (req, res) => {
	const customer = await Customer.findOne({ _id: req.params.id });
	res.send(customer);
});

router.get("/customers/:id/insurance", async (req, res) => {
	const customer = await Customer.findOne({ _id: req.params.id });

	const city = customer.city;
	const dateofbirth = customer.birthdate;

	let insurance_price = insurance(city, dateofbirth);

	res.send({ insurance: insurance_price });
});

router.patch("/customers/:id", async (req, res) => {
	try {
		const customer = await Customer.findOne({ _id: req.params.id });

		if (req.body.name) customer.name = req.body.name;
		if (req.body.mail) customer.mail = req.body.mail;
		if (req.body.city) customer.city = req.body.city;
		if (req.body.birthdate) customer.birthdate = req.body.birthdate;

		await customer.save();
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.send(customer);
	} catch {
		res.status(404);
		res.send({ error: "customer doesn't exist!" });
	}
});

router.delete("/customers/:id", async (req, res) => {
	try {
		await Customer.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Customer doesn't exist!" });
	}
});

module.exports = router;


