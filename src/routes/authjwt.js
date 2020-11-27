const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
require('../controllers/passport.controller')

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  )
authRouter.post(
'/login',
async (req, res, next) => {
    passport.authenticate(
    'login',
    async (err, user, info) => {
        try {
        if (err || !user) {
            const err = {errors: [{message: 'Error Occured'}], status: 400}

            return next(err);
        }

        req.login(
            user,
            { session: false },
            async (err) => {
            if (err) return next(err);

            const body = { _id: user.id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');

            return res.json({ token });
            }
        );
        } catch (err) {
        return next(err);
        }
    }
    )(req, res, next);
}
)

authRouter.use((err, req, res, next) => {
    res.status(err.status || 400).json({message: err.errors[0].message})
})

module.exports = authRouter;