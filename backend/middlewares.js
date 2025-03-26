import {
	validateCredentials,
	getCredentialsFromAuthenticationCookie,
} from "./auth.js";


// User authentication validation middleware.
async function setAuthenticatedRequestProperty(req, resp, next) {
	let { Token: token } = req.cookies;
	if (!token) {
		req.isLoggedIn = false;
	} else {
		token = new String(token);
		const [email, passwordHash, role, ...extra] =
			getCredentialsFromAuthenticationCookie(token);

		if (extra.length > 0) {
			resp.status(400).send(
				"Invalid request. Please clear your cookies and refresh this page.",
			);
			return;
		}

		if (!email || !passwordHash || !role) req.isLoggedIn = false;
		else {
			const [isValidCredentials, _] = await validateCredentials(
				email,
				passwordHash,
				role,
				true
			);
			req.isLoggedIn = isValidCredentials;
		}
	}

	next();
}

// "Block if not authenticated" middleware.
function blockIfNotLoggedIn(req, res, next) {
	if (!req.isLoggedIn) {
		res.status(401).send("Please log in to access this resource.");
		return;
	}

	next();
}

export { setAuthenticatedRequestProperty, blockIfNotLoggedIn };
