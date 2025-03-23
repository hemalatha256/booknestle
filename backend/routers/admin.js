import express from "express";

import { User, Seller, Order } from "../mongoose-setup.js";
import { validateCredentials, getAuthenticationCookie } from "../auth.js";

// Admin router, for admin functions.
const adminRouter = express.Router();

adminRouter.post("/login", (req, res) => {
	const { email, password: passwordHash } = req.body;
	const isValidCredentials = validateCredentials(
		email,
		passwordHash,
		"Admin",
	);

	if (req.isAuthorized) {
		res.send("Already logged in. Please log out first.");
		return;
	}

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "Admin"),
		);
		res.status(200).send("Logged in successfully.");
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

adminRouter.get("/users", async (_, res) => {
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

adminRouter.get("/sellers", async (_, res) => {
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

adminRouter.get("/orders", async (_, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		const allOrders = await Order.find({}, "_id name email");
		res.status(200).json(allOrders);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error fetching orders.");
	}
});

adminRouter.post("/modifyOrder", async (_, res) => {
	if (!req.isLoggedIn) {
		res.status(401).send("Please login to continue.");
		return;
	}

	try {
		await Order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, req.body);
		res.status(200).send("Modified successfully");
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal error when modifying orders.");
	}
});

export { adminRouter };
