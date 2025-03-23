import express from "express";

import { Book, Order, Seller } from "../mongoose-setup.js";

import { validateCredentials, getAuthenticationCookie, getCredentialsFromAuthenticationCookie } from "../auth.js";
import mongoose from "mongoose";

// Seller router, for book sellers.
const sellerRouter = express.Router();

sellerRouter.post("/signup", async (req, res) => {
	if (req.isAuthorized) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	await new Seller(req.body).save();

	res.status(200).send("Signed up successfully.");
});

sellerRouter.post("/login", (req, res) => {
	if (req.isAuthorized) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	const { email, password: passwordHash } = req.body;
	const isValidCredentials = validateCredentials(
		email,
		passwordHash,
		"Seller",
	);

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "Seller"),
		);
		res.status(200).send("Logged in successfully.");
	} else {
		res.status(400).send("Invalid credentials.");
	}
});

sellerRouter.get("/logout", (req, res) => {
	if (!req.isAuthorized) {
		res.status(401).send("Please login to logout.");
		return;
	}

	res.clearCookie("Token");
	res.redirect("/user/login");
});

sellerRouter.get("/books", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);

	try {
		const sellerBooks = await Book.find({ seller: {email} });
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

sellerRouter.post("/deleteBook", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("")
		return;
	}

	const [email, ..._] =
			getCredentialsFromAuthenticationCookie(token);

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
		await Order.findOneAndUpdate({ seller: {email}, _id: mongoose.Types.ObjectId(req.body._id) }, req.body);
		res.status(200).send("Modified successfully");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when modifying order.");
	}
});

export { sellerRouter };
