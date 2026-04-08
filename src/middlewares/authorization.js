export const authorization = (...roles) => {
    return (req, res, next) => {
        if (!req.res) {
            return res.status(401).send({ error: "No autenticado" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: "No autorizado" });
        }

        next();
    };
};