import passport from "passport";
import local from "passport-local";
import jwt from "passport.jwt";
import { UserModel } from "../models/user.model";
import { isValidPassword } from "../utils/hash";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJWT;

export const initializePassport = () => {
    passport.use("login",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await UserModel.findOne({ email });
                    if (!user) return done(null, false);
                    if (!isValidPassword(user, password)) return done(null, false);
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use("jwt",
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secretJWT",
        },
    async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }
));
};