import jwt from "jsonwebtoken";

export default class SessionsController {
    constructor(userService) {
        this.userService = userService;
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await this.userService.login(email, password);

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.send({ status: "success", token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    };

    forgotPassword = async (req, res) => {
        const { email } = req.body;

        const user = await this.userService.getUserByEmail(email);
        if (!user) return res.status(404).send("Usuario no existe");

        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const link = `http://localhost:3000/reset-password?token=${token}`;

        console.log(link);

        res.send("Correo enviado");
    };

    resetPassword = async (req, res) => {
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await this.userService.getUserByEmail(decoded.email);

            if (isValidPassword(user, newPassword)) {
                return res.status(404).send("No puedes usar la misma contraseña");
            }

            user.password = createHash(newPassword);
            await user.save();

            res.send("Contraseña actualizada");
        } catch (error) {
            res.status(404).send("Token inválido o expirado");
        }
    };
}