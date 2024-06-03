import pkg from "http-status";

const notFound = (req, res, next) => {
    res.status(pkg.NOT_FOUND).json({
        success: false,
        message: "Page not found",
    });
};

export default notFound;
