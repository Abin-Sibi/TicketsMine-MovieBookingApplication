const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.userToken
    if (token) {
        jwt.verify(token, process.env.userToken, async (err, decodedToken) => {
            if (err) {
                console.log("not verified")
                res.json({ status: false })
                next();
            } else {
                const user = await User.findById(decodedToken.id)
                if (user) {
                    console.log("not verified")
                    res.json({ status: true, user: user.email })
                }
                else res.json({ status: false })
                next();
            }
        })
    } else {
        res.json({ status: false });
        next();
    }
}

module.exports.checkBlocked = (req, res, next) => {
    const token = req.cookies.userToken
    if (token) {
        jwt.verify(token, process.env.userToken, async (err, decodedToken) => {
            if (err) {
                console.log("not verified")
                res.json({ status: false })
                next();
            } else {// get user id from decoded token
                User.findById(decodedToken.id, (err, user) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    if (!user) {
                        return res.status(401).json({ error: 'Unauthorized' });
                    }
                    if (user.isBlocked) {
                        return res.status(403).json({ error: 'User is blocked' });
                    }
                    // if user is not blocked, allow access to the requested page or functionality
                    next();
                });
            }
        })
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.authUser = (req, res, next) => {
    const token = req.cookies.userToken
    if (token) {
        jwt.verify(token, process.env.userToken, async (err, decodedToken) => {
            if (err) {
                console.log("not verified")
                res.json({ status: false })
            } else {
                const user = await User.findById(decodedToken.id)
                if (user) {
                    next();
                }
                else res.json({ status: false })
            }
        })
    } else {
        res.json({ status: false });
    }
}