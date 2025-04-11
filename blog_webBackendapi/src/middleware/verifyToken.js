import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            message: "Access token is required",
            errCode: 1
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token",
            errCode: 1
        });
    }
};

export default verifyToken; 