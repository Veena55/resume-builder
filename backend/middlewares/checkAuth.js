const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({ message: 'No Token privided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Decode the token header to determine its type
    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        if (decodedHeader.header.alg.startsWith('RS')) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            req.user = payload;
            next();
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;  // Attach the decoded JWT to the request object
            next();  // Proceed to the next middleware or route handler
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!!" })
    }
}
module.exports = checkAuth;