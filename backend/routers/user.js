import express from "express";

import { User, Seller, Book, Order } from "../mongoose-setup.js";

import { validateCredentials, getAuthenticationCookie } from "../auth.js";

// User router, for regular users.
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
	if (req.isLoggedIn) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	await new User({
		...req.body,
		password: CryptoJS.MD5(
			process.env.PASSWORD_SALT +
				":" +
				CryptoJS.MD5(req.body.password).toString(),
		).toString(),
	}).save();

	res.status(200).send("Signed up successfully.");
});

userRouter.post("/login", async (req, res) => {
	const { email, password: passwordHash } = req.body;
	const [isValidCredentials, userRecord] = await validateCredentials(
		email,
		passwordHash,
		"User",
	);

	if (req.isLoggedIn) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "User"),
		);
		res.status(200).json(userRecord);
	} else {
		res.status(400).send("Invalid credentials.");
	}
});

userRouter.get("/logout", (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to logout.");
		return;
	}

	res.clearCookie("Token");
	res.send("Logged out successfully.");
});

userRouter.post("/placeOrder", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to logout.");
		return;
	}

	// const orderInfo = req.body;
	try {
		const [userEmail, ..._] = getCredentialsFromAuthenticationCookie(
			res.cookies.Token,
		);

		const user = await User.findOne({ email: userEmail });
		const book = await Book.findOne({ _id: req.body.bookID }).populate(
			"seller",
		);
		const seller = await Seller.findOne({ _id: book.seller._id });

		const newOrder = new Order({
			flatNo: req.body.flatNo,
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			pincode: req.body.pincode,
			totalAmount: req.body.quantity * book.price,
			seller: seller,
			books: [book],
			orderedOn: Date.now(),
			statusDescription: "Ordered",
		});
		await newOrder.save();

		res.status(200).send("Order placed successfully.");
	} catch (e) {
		console.log(e);
		res.status(500).send("Error placing order.");
	}
});

export { userRouter };
