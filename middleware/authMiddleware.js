import Veterinario from '../models/Veterinario.js'
import jwt from 'jsonwebtoken'

const checkAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    let token;

    if (authorization && authorization.startsWith('Bearer')) {
    try {
        token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado -createdAt -updatedAt -__v');
        return next();
    } catch (e) {
        const error = new Error('Token no válido');
        return res.status(403).json({ msg: error.message });
    };
};

    if (!token) {
        const error = new Error('Token requerido');
        return res.status(403).json({ msg: error.message });
};
    next();
};

export default checkAuth;