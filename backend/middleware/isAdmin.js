const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: "You do not have permission to do this."});
    } else if (req.user.admin !== 1) {
        return res.status(401).json({message: "You do not have permission to do this."});
    } else {
        next();
    }
}

module.exports = isAdmin;