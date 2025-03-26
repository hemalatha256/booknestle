import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import {
	setAuthenticatedRequestProperty,
	blockIfNotLoggedIn,
} from "./middlewares.js";
import { adminRouter } from "./routers/admin.js";
import { userRouter } from "./routers/user.js";
import { bookRouter } from "./routers/book.js";
import { sellerRouter } from "./routers/seller.js";
import { Book } from "./mongoose-setup.js";

const app = express();
const port = process.env.PORT;

// Global middleware setup.
app.use(
	cors({ credentials: true, origin: (_, callback) => callback(null, true) }),
);
app.use(cookieParser());
app.use(bodyParser.json());

// Custom authentication middleware.
app.use(setAuthenticatedRequestProperty);

// Set up routers.
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);

app.use("/books", blockIfNotLoggedIn);
app.use("/books", bookRouter);

// Set up image sending route.
app.get("/bookImage", async (req, res) => {
	try {
		const imageData = (
			await Book.findById(
				req.query.bookID,
				"itemImage",
			)
		).itemImage;
		res.writeHead(200, {
	        'Content-Type': "image/png",
	        'Content-Length': imageData.byteLength
	    });
		res.end(imageData);
	} catch (e) {
		console.log(e);
		res.status(404).type("image/png").send();
	}
});

// Listening.
app.listen(port, () => {
	console.log(`Example app listening on port ${port}.`);
});
