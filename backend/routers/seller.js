import express from "express";

import { Book, Order, Seller } from "../mongoose-setup.js";

import { validateCredentials, getAuthenticationCookie, getCredentialsFromAuthenticationCookie } from "../auth.js";
import mongoose from "mongoose";

// Seller router, for book sellers.
const sellerRouter = express.Router();

sellerRouter.post("/signup", async (req, res) => {
	if (req.isLoggedIn) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	await new Seller(req.body).save();

	res.status(200).send("Signed up successfully.");
});

sellerRouter.post("/login", async (req, res) => {
	if (req.isLoggedIn) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	const { email, password: passwordHash } = req.body;
	const [isValidCredentials, sellerRecord] = await validateCredentials(
		email,
		passwordHash,
		"Seller",
	);
	console.log(passwordHash);
	console.log(isValidCredentials, sellerRecord);

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "Seller"),
		);
		res.status(200).json(sellerRecord);
	} else {
		res.status(400).send("Invalid credentials.");
	}
});

sellerRouter.get("/logout", (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to logout.");
		return;
	}

	res.clearCookie("Token");
	res.send("Logged out successfully.");
});

sellerRouter.get("/getStatistics", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(req.cookies.Token);

	try {
		const seller = await Seller.findOne({email});
		const sellerBooksCount = await Book.countDocuments({ seller: seller._id });
		const sellerOrdersCount = await Order.countDocuments({ seller: seller._id });
		let sellerOrdersSum = (await Order.aggregate([{ $match: {seller: seller._id} }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]));
		if (sellerOrdersSum.length) {
			sellerOrdersSum = sellerOrdersSum[0].total;
		} else {
			sellerOrdersSum = 0;
		}
		res.status(200).json({sellerBooksCount, sellerOrdersCount, sellerOrdersSum});
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's books.");
	}
});

sellerRouter.get("/books", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);

	try {
		const sellerBooks = await Book.find({ "seller.email": email });
		res.status(200).json(sellerBooks);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's books.");
	}
});

sellerRouter.post("/addBook", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please log in first.")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);
	req.body.email = email;

	try {
		await (new Book(req.body)).save();
		res.status(200).send("Book added successfully.");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's books.");
	}
});

sellerRouter.post("/modifyBook", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please log in first.")
		return;
	}

	try {
		await Book.findOneAndReplace({_id: mongoose.Types.ObjectId.createFromHexString(req.body._id)}, req.body);
		// await (new Book(req.body)).save();
		res.status(200).send("Book added successfully.");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's books.");
	}
});

sellerRouter.post("/deleteBook", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	try {
		await Book.findByIdAndDelete(new String(req.body.id));
		res.status(200).json(sellerBooks);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's books.");
	}
});

sellerRouter.get("/orders", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);

	try {
		const sellerOrders = await Order.find({ seller: {email} });
		res.status(200).json(sellerOrders);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when fetching seller's orders.");
	}
});

sellerRouter.get("/modifyOrder", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);

	try {
		await Order.findOneAndUpdate({ seller: {email}, _id: mongoose.Types.ObjectId.createFromHexString(req.body._id) }, req.body);
		res.status(200).send("Modified successfully");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when modifying order.");
	}
});

export { sellerRouter };
