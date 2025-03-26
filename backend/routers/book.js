import express from "express";
import mongoose from "mongoose";

import { Book } from "../mongoose-setup.js";

// Book router, for browsing books.
const bookRouter = express.Router();

// id: bookID,

bookRouter.get("/", async (req, res) => {
	let filters = { price: {} };
	let start, limit;
	({
		title: filters.title,
		author: filters.author,
		genre: filters.genre,
		description: filters.description,
		priceLessThan: filters.price.lt = 99999,
		priceGreaterThan: filters.price.gt = 0,
		start = 0,
		limit = 5,
	} = req.query);
	if (filters.description)
		filters.description = filters.description.substring(0, 200);

	if (![5, 10, 25, 50, 100].includes(limit)) {
		res.status(400).send(
			"Limit parameter should be one of 5, 10, 25, 50 or 100.",
		);
		return;
	}

	try {
		start = Number.parseInt(start);
	} catch (e) {
		res.status(400).send("Start paramter should be a valid integer.");
		return;
	}

	const predicate = {};
	if (req.query.bookID) predicate["_id"] = mongoose.Types.ObjectId.createFromHexString(req.query.bookID);
	else {
		if (filters.title)
			predicate.title = { $regex: new String(filters.title) };
		if (filters.author)
			predicate.author = { $regex: new String(filters.author) };
		if (filters.genre)
			predicate.genre = { $regex: new String(filters.genre) };
		if (filters.description)
			predicate.description = { $regex: new String(filters.description) };
		if ("gt" in filters.price && "lt" in filters.price)
			predicate.price = {
				$gt: Number.parseFloat(filters.price.gt),
				$lt: Number.parseFloat(filters.price.lt),
			};
		else if ("gt" in filters.price)
			predicate.price = { $gt: Number.parseFloat(filters.price.gt) };
		else if ("lt" in filters.price)
			predicate.price = { $lt: Number.parseFloat(filters.price.lt) };
	}

	const filteredBooks = await Book.find(predicate, "-__v -itemImage");

	res.status(200).send(JSON.parse(JSON.stringify(filteredBooks)));
});

export { bookRouter };
