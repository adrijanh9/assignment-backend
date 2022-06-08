basePriceData = require("./base_price.json");
discountData = require("./discount.json");

function calculateAge(birthdate) {
	let dob = new Date(birthdate);

	let month_diff = Date.now() - dob.getTime();
	let age_dt = new Date(month_diff);
	let year = age_dt.getUTCFullYear();
	let age = Math.abs(year - 1970);

	return age;
}

module.exports = function calculateInsurance(city, dateofbirth) {
	let base_price;

	if (basePriceData.find((o) => o.city == city)) {
		base_price = basePriceData.find((o) => o.city == city)["amount"];
	} else {
		base_price = basePriceData.find((o) => o.city == "other")["amount"];
	}

	const age = calculateAge(dateofbirth);

	let discount = discountData.find(
		(o) => age >= o.age.split("-")[0] && age <= o.age.split("-")[1]
	).discount;

	console.log("discount " + discount);

	return base_price - base_price * (discount / 100);
};
