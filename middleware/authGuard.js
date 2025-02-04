
const jwt =require('jsonwebtoken')
const authGuard = (req, res, next) => {
    
// check incoming data
console.log(req.headers);


    // 1. get authrisation data from headers
    const authHeader =req.headers.authorization;

    // 2. check or validate
    if(!authHeader){
        return res.status(400).json({
            success : false,
            message: "Auth Header not found!"
        })
    }
    // 3. split the data in format: bearer token-sdfg .. take only token

    const token = authHeader.split(' ')[1]; // index 0 is bearer and index 1 is token

    // 4. if token  not found - stop the process / end response
    if(!token || token === ''){
        return res.status(400).json({
            success : false,
            message: "Token not found!"
        })
    }

    // 5. if token found - verify token

    try {
        const decodeUserData =jwt.verify(token, process.env.JWT_SECRET)
        req.user =decodeUserData
        next()
    } catch (error) {
        res.status(400).json({
            success : false,
            message: "Not Authenticated"
        })
    }
}

    // admin gaurd

const adminGuard = (req, res, next) => {
    
    // check incoming data
    console.log(req.headers);
    
    // 1. get authrisation data from headers
    const authHeader =req.headers.authorization;
    // 2. check or validate
    if(!authHeader){
        return res.status(400).json({
            success : false,
            message: "Auth Header not found!"
        })
        }
        // 3. split the data in format: bearer token-sdfg .. take only token
        const token = authHeader.split(' ')[1]; // index 0 is bearer and index 1 is token
    
        // 4. if token  not found - stop the process / end response
        if(!token || token === ''){
            return res.status(400).json({
                success : false,
                message: "Token not found!"
            })
        }
    
        // 5. if token found - verify token
    
        try {
            const decodeUserData =jwt.verify(token, process.env.JWT_SECRET)
            req.user =decodeUserData;
            if(!req.user.isAdmin){
                return res.status(400).json({
                    success: false,
                    message: "Permission denied"
                })
            }
            next()
        } catch (error) {
            res.status(400).json({
                success : false,
                message: "Not Authenticated"
            })
        }
        }
    
    // 6. if token verified - next(function in the route/controller)
    // 7. if token not verified - stop the process / end response
 



module.exports = {
    authGuard,
    adminGuard
}


// const jwt = require('jsonwebtoken');

// const authGuard = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: 'Auth Header not found!'
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   if (!token || token === '') {
//     return res.status(401).json({
//       success: false,
//       message: 'Token not found!'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({
//       success: false,
//       message: 'Not authenticated'
//     });
//   }
// };

// const adminGuard = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: 'Auth Header not found!'
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   if (!token || token === '') {
//     return res.status(401).json({
//       success: false,
//       message: 'Token not found!'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     if (!req.user.isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: 'Permission denied'
//       });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({
//       success: false,
//       message: 'Not authenticated'
//     });
//   }
// };

// module.exports = {
//   authGuard,
//   adminGuard
// };
