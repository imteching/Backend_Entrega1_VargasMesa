import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { createHash } from "../utils/hash";
import UserDTO from "../dto/user.dto";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).send({ error: "User exists" });

    const user = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
    });

    res.send({ status: "success", user });
});

// LOGIN → Generar JWT
router.post(
    "/login",
    passport.authenticate("login", { session: false }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "secretJWT",
            { expiresIn: "1h" }
        );

        res.send({ status: "success", token });
    }
);

// CURRENT → Validar JWT
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const userDTO = new UserDTO(req.user);
        res.send({ status: "success", userDTO });
    }
);

// solo admin
router.post(
    "/products",
    passport.authenticate("jwt", { session: false }),
    authorization("admin"),
    (req, res) => {
        res.send("Producto creado");
    }
);

// solo user agrega carrito
router.post(
    "/carts/:cid/product/:pid",
    passport.authenticate("jwt", { session: false }),
    authorization("user"),
    controller.addProduct
);

export default router;