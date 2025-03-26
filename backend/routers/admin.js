import express from "express";
import mongoose from "mongoose";

import { User, Seller, Order, Book } from "../mongoose-setup.js";
import { validateCredentials, getAuthenticationCookie } from "../auth.js";

// Admin router, for admin functions.
const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
	if (req.isLoggedIn) {
		res.send("Already logged in. Please log out first.");
		return;
	}

	const { email, password: passwordHash } = req.body;
	const [isValidCredentials, adminRecord] = await validateCredentials(
		email,
		passwordHash,
		"Admin",
	);

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "Admin"),
		);
		res.status(200).json(adminRecord);
	} else {
		res.status(400).send("Invalid credentials.");
	}
});

adminRouter.get("/logout", (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to logout.");
		return;
	}

	res.clearCookie("Token");
	res.send("Logged out successfully.");
});

adminRouter.post("/addAdmin", async (req, res) => {
	if (!req.isLoggedIn) {
		res.send("Already logged in. Please log out first.");
		return;
	}

	await new Admin(req.body).save();
	res.status(200).send("Admin added successfully.");
});

adminRouter.get("/users", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		const allUsers = await User.find({}, "_id name email");
		res.status(200).json(allUsers);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error fetching users.");
	}
});

adminRouter.post("/deleteUser", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await User.findByIdAndDelete(req.body.id);
		res.status(200).send("User deleted successfully.");
	} catch (e) {
		console.error(e);
		res.status(400).send("User with given ID does not exist.");
	}
});

adminRouter.get("/sellers", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		const allSellers = await Seller.find({}, "_id name email");
		res.status(200).json(allSellers);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error fetching sellers.");
	}
});

adminRouter.post("/deleteSeller", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await Seller.findByIdAndDelete(req.body.id);
		res.status(200).send("Seller deleted successfully.");
	} catch (e) {
		console.error(e);
		res.status(400).send("Seller with given ID does not exist.");
	}
});

adminRouter.get("/books", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		let books = [];
		if (req.query.sellerID) {
			books = await Book.find({seller: new mongoose.Types.ObjectId(req.query.sellerID)}, "-__v -itemImage").populate("seller");
		} else {
			books = await Book.find({}, "-__v -itemImage -seller");
		}
		res.status(200).json(books);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error fetching books.");
	}
});

adminRouter.post("/deleteBook", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await Book.findByIdAndDelete(req.body.id);
		res.status(200).send("Book deleted successfully.");
	} catch (e) {
		console.error(e);
		res.status(400).send("Book with given ID does not exist.");
	}
});

adminRouter.get("/orders", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		let orders = [];
		if (req.params.userID) {
			orders = await Order.find(
				{
					user: mongoose.Types.ObjectId.createFromHexString(
						req.params.userID,
					),
				},
				"_id name email",
			).populate("books", "-itemImage -__v");
		} else if (req.params.sellerID) {
			orders = await Order.find(
				{
					seller: mongoose.Types.ObjectId.createFromHexString(
						req.params.userID,
					),
				},
				"_id name email",
			).populate("books", "-itemImage -__v");
		} else {
			orders = await Order.find({}, "_id name email").populate(
				"books",
				"-itemImage -__v",
			);
		}
		res.status(200).json(orders);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error fetching orders.");
	}
});

adminRouter.post("/modifyOrder", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await Order.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId.createFromHexString(req.body._id) },
			req.body,
		);
		res.status(200).send("Modified successfully");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when modifying orders.");
	}
});

adminRouter.post("/deleteOrder", async (req, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await Order.findByIdAndDelete(req.body.id);
		res.status(200).send("Modified successfully");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when modifying orders.");
	}
});

export { adminRouter };
