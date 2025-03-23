import { LRUCache } from "lru-cache";
import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";

import { User, Admin, Seller } from "./mongoose-setup.js";

const PASSWORD_SALT = process.env.PASSWORD_SALT;
const cachedCredentials = new LRUCache({ max: 500, allowStale: false });

async function validateCredentials(email, passwordHash, role) {
	let storedHash;
	if (cachedCredentials.has(email)) storedHash = cachedCredentials.get(email);
	else if (role === "User")
		storedHash = (await User.findOne({ email: email })).password;
	else if (role === "Admin")
		storedHash = (await Admin.findOne({ email: email })).password;
	else if (role === "Seller")
		storedHash = (await Seller.findOne({ email: email })).password;
	else throw Error('"role" must be one of "User", "Admin" or "Seller".');

	cachedCredentials.set(email, passwordHash);

	const calculatedHash = createHash("md5")
		.update(PASSWORD_SALT + ":" + passwordHash)
		.digest("hex");

	return storedHash === calculatedHash;
}

// The credentials passed to this function must be validated already.
function getAuthenticationCookie(email, passwordHash, role) {
	return Buffer.from(`${email}:${passwordHash}:${role}`).toString(
		"base64",
	);
}

function getCredentialsFromAuthenticationCookie(cookie) {
	return Buffer.from(cookie, "base64").toString().split(":");
}

export {
	cachedCredentials,
	validateCredentials,
	getAuthenticationCookie,
	getCredentialsFromAuthenticationCookie,
};
