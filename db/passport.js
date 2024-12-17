const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("./queries");
const bcrypt = require("bcryptjs");

const customFields = {
	usernameField: "user",
	passwordField: "password",
};

const strategy = new LocalStrategy((customFields, async (username, password, done) => {
	try {
		const user = await getUser(username);
		if (!user || user.length > 1)
			return done(null, false, { message: "Invalid username or password"});
		const passMatch = await bcrypt.compare(password, user[0].password);
		if (!passMatch)
			return done(null, false, { message: "Invalid username or password"});
		return done(null, username);
	} catch (error) {
		return done(error);
	}
}));