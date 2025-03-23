import express from "express";

import { User } from "../mongoose-setup.js";

import { validateCredentials, getAuthenticationCookie } from "../auth.js";

// User router, for regular users.
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
	if (req.isAuthorized) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	await new User(req.body).save();

	res.status(200).send("Signed up successfully.");
});

userRouter.post("/login", (req, res) => {
	const { email, password: passwordHash } = req.body;
	const isValidCredentials = validateCredentials(
		email,
		passwordHash,
		"User",
	);

	if (req.isAuthorized) {
		res.status(400).send("Already logged in. Please log out first.");
		return;
	}

	if (isValidCredentials) {
		res.cookie(
			"Token",
			getAuthenticationCookie(email, passwordHash, "User"),
		);
		res.status(200).send("Logged in successfully.");
	} else {
		res.status(400).send("Invalid credentials.");
	}
});

userRouter.get("/logout", (req, res) => {
	if (!req.isAuthorized) {
		res.status(401).send("Please login to logout.");
		return;
	}

	res.clearCookie("Token");
	res.redirect("/user/login");
});

export { userRouter };
