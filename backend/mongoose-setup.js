import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	// userId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "vendor"
	// }
});

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	genre: { type: String, required: true },
	itemImage: { type: mongoose.Schema.Types.Buffer, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	// userId: {
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		// ref: "User"
		ref: "Seller",
		required: true,
	},
	// userName: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	// userId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "user"
	// }
});

const adminSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	// userId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "admin"
	// }
});

const orderSchema = new mongoose.Schema({
	flatNo: String,
	street: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	country: { type: String, required: true },
	pincode: { type: Number, required: true },
	totalAmount: { type: Number, required: true },
	// seller: { type: mongoose.Schema.Types.ObjectId, ref: "seller" },
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Seller",
		required: true,
	},
	books: [bookSchema],
	orderedOn: { type: Number, required: true },
	deliveredOn: { type: Number },
	cancelled: { type: Boolean, required: true, default: false },
	statusDescription: String,
});

const wishlistItemSchema = new mongoose.Schema({
	book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	reason: String,
});

// Create models.
const Seller = mongoose.model("Seller", sellerSchema);
const Book = mongoose.model("Book", bookSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Order = mongoose.model("Order", orderSchema);
const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

export { Seller, Book, User, Admin, Order, WishlistItem };

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI);
