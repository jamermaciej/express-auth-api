const expressJwt = require('express-jwt');
const { secret } = require('config.json');

module.exports = jwt;

function jwt(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User)
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // authorize based on user role
        (req, res, next ) => {
            
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorizedss' });
            }

            // authentication and authorization successful
            next();
        }
    ];

    // return expressJwt({ secret }).unless({
    //     path: [
    //         // public routes that don't require authentication
    //         '/users/authenticate'
    //     ]
    // });
}