const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { DataTypes } = require("sequelize");
const sequelize = require('../db/db');
const User = require('../models/users')(sequelize, DataTypes)
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.create({ email: email, password: password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  )

passport.use('login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const user = await User.findOne({where: { email: email }})
                if (!user){
                    return done(null, false, { message: 'Incorrect username.' }) 
                }
                const passVal = await user.validPassword(password)
                if(!passVal){
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user);
              }catch(err){
                  return done(err)
              }
        }
    )
)

passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );