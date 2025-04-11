const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
                errCode: 1
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You don't have permission to access this resource",
                errCode: 1
            });
        }

        next();
    };
};

export default checkRole; 