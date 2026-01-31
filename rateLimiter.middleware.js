const requestMap = {};

export const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!requestMap[ip]) requestMap[ip] = [];

    requestMap[ip] = requestMap[ip].filter(
        time => currentTime - time < 60000
    );
    if (requestMap[ip].length >= 3) {
        return
        res.status(429).json({message : "Too many requests" });
    }
    requestMap[ip].push(currentTime);
    next();
};