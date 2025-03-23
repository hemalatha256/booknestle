import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { setAuthenticatedRequestProperty, blockIfNotLoggedIn } from "./middlewares.js";
import { adminRouter } from "./routers/admin.js";
import { userRouter } from "./routers/user.js";
import { bookRouter } from "./routers/book.js";
import { sellerRouter } from "./routers/seller.js";

const app = express();
const port = process.env.PORT;

// Global middleware setup.
app.use(cors());
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

// Listening.
app.listen(port, () => {
	console.log(`Example app listening on port ${port}.`);
});
