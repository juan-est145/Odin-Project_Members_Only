const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("./queries");
const { getUserById } = require("./queries");
const bcrypt = require("bcryptjs");

const customFields = {
	usernameField: "user",
	passwordField: "password",
};

const strategy = new LocalStrategy((customFields, async (username, password, done) => {
	try {
		const user = await getUser(username);
		if (user.length !== 1)
			return done(null, false, { message: "Invalid username or password" });
		const passMatch = await bcrypt.compare(password, user[0].password);
		if (!passMatch)
			return done(null, false, { message: "Invalid username or password" });
		return done(null, user[0]);
	} catch (error) {
		return done(error);
	}
}));

passport.use(strategy);
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	try {
		const user = await getUserById(id);
		done(null, user[0]);
	} catch (error) {
		done(error);
	}
});

const passportConf = passport.session();
const passportAuth = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Authentication failed
            req.flash('valErrors', info ? [{msg : info.message}] : [{msg : "Invalid username or password"}]);
            return res.redirect("/log-in");
        }
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            // Authentication succeeded
            return res.redirect("/messages");
        });
    })(req, res, next);
};
module.exports = {
	passportConf,
	passportAuth,
};