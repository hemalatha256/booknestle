import { LRUCache } from "lru-cache";
import CryptoJS from "crypto-js";
import { Buffer } from "node:buffer";

import { User, Admin, Seller } from "./mongoose-setup.js";

const cachedCredentials = new LRUCache({ max: 500, allowStale: false });

async function validateCredentials(email, passwordHash, role, fastCheck=false) {
	const calculatedHash = CryptoJS.MD5(
		process.env.PASSWORD_SALT + ":" + passwordHash,
	).toString(CryptoJS.enc.Hex);

	let storedHash, roleRecord;
	if (cachedCredentials.has(email)) storedHash = cachedCredentials.get(email);

	if (fastCheck && cachedCredentials.has(email)) {
		storedHash = cachedCredentials.get(email);
		return [storedHash === calculatedHash, undefined];
	}

	if (role === "User") roleRecord = await User.findOne({ email });
	else if (role === "Admin")
		roleRecord = await Admin.findOne({ email });
	else if (role === "Seller")
		roleRecord = await Seller.findOne({ email });
	else throw Error('"role" must be one of "User", "Admin" or "Seller".');

	if (!roleRecord) return [false, undefined];

	storedHash = roleRecord.password;
	if (!storedHash) return [false, undefined];

	cachedCredentials.set(email, storedHash);

	return [storedHash === calculatedHash, roleRecord];
}

// The credentials passed to this function must be validated already.
function getAuthenticationCookie(email, passwordHash, role) {
	return Buffer.from(`${email}:${passwordHash}:${role}`).toString("base64");
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
